import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTimeTrackerEnablePomodoro as getTimeTrackerEnablePomodoroSelector,
  getTimeTrackerPomodoroIntervalTime as getTimeTrackerPomodoroIntervalTimeSelector,
  getTrackTimeNamesBreakTime as getTrackTimeNamesBreakTimeSelector,
  getTimeTrackerBreakIntervalTime as getTimeTrackerBreakIntervalTimeSelector,
  getTrackTimeCurrentTrackTime as getTrackTimeCurrentTrackTimeSelector,
} from '../../../redux/selectors/timeTrackerSelectors';
import {
  endTrackTimeTimer as endTrackTimeTimerAction,
  startTrackTimeTimer as startTrackTimeTimerAction,
} from '../../../redux/actions/timeTrackerActions';
import {
  displayHourMinSecTime,
  getDateTransform,
} from '../../../utils/dateUtils';
import { FilledButton, Button } from '../../BaseComponents';
import { ReactComponent as StopSVG } from '../../../assets/icons/stop.svg';
import { ReactComponent as ExitSVG } from '../../../assets/icons/exit.svg';
import { ReactComponent as ExpandSVG } from '../../../assets/icons/expand.svg';
import { ReactComponent as PlaySVG } from '../../../assets/icons/play.svg';

const CurrentTrackTimeContent = ({
  currentTrackTime,
  onModalButton,
  timeTrackerEnablePomodoro,
  timeTrackerPomodoroIntervalTime,
  timeTrackerBreakIntervalTime,
  endTrackTimeTimer,
  startTrackTimeTimer,
  breakTime,
  isShowing = false, // can use to check if modal is open
}) => {
  const initialTimeElapsed = '0:00:00';
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  const [timeElapsedInterval, setTimeElapsedInterval] = useState(null);
  const [finished, setFinished] = useState(false);
  const [previousCurrentTrackTime, setPreviousCurrentTrackTime] = useState('');

  const displayElapsedTime = () => {
    if (currentTrackTime.id) {
      const id = setInterval(() => {
        setTimeElapsed(
          displayHourMinSecTime(
            new Date().getTime() -
              new Date(currentTrackTime.start_time).getTime(),
          ),
        );
      }, 1000);
      setTimeElapsedInterval(id);
    }
  };

  const endNewTrackTime = () => {
    if (timeElapsedInterval) {
      clearInterval(timeElapsedInterval);
      setTimeElapsedInterval(null);
      setTimeElapsed(initialTimeElapsed);
    }
    endTrackTimeTimer(currentTrackTime.id, {
      end_time: new Date(),
    });
    setPreviousCurrentTrackTime(currentTrackTime);
    setFinished(true);
  };

  useEffect(() => {
    let interval = null;
    if (timeTrackerEnablePomodoro) {
      const timeLimit =
        currentTrackTime.id === breakTime.id
          ? timeTrackerBreakIntervalTime
          : timeTrackerPomodoroIntervalTime;
      interval = setInterval(() => {
        endNewTrackTime();
      }, timeLimit);
      setTimeElapsedInterval(interval);
    }
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    displayElapsedTime();
  }, [currentTrackTime]);

  const continueTrackTime = async (trackTimeNameId) => {
    setFinished(false);
    const today = new Date();
    await startTrackTimeTimer({
      track_time_name: trackTimeNameId,
      start_time: today,
      date: getDateTransform(today),
    });
    displayElapsedTime();
  };

  return (
    <div className="w-full text-center p-4 h-full">
      <div className="h-0 flex justify-end w-full">
        {!finished && (
          <FilledButton classes="h-6" action={() => onModalButton(finished)}>
            <div>
              {isShowing ? (
                <ExitSVG className="w-4 h-auto" title="Exit out of modal" />
              ) : (
                <ExpandSVG className="w-4 h-auto" title="Expand into modal" />
              )}
            </div>
          </FilledButton>
        )}
      </div>
      <h1 className="text-2xl font-bold">Tracking</h1>
      {!finished && currentTrackTime.track_time_name && (
        <div>
          <p className="pt-12 underline">
            {currentTrackTime.track_time_name.name}
          </p>
          <p className="p-12 text-6xl">{`${timeElapsed} min`}</p>
          <FilledButton action={endNewTrackTime}>
            <div className="flex">
              <span className="mx-2">Stop</span>
              <StopSVG
                className="w-4 h-auto"
                title="Stop current tracked time"
              />
            </div>
          </FilledButton>
        </div>
      )}
      {finished && (
        <div className="flex flex-col">
          <div>
            <p className="pt-12 underline">
              {previousCurrentTrackTime.track_time_name.name}
            </p>
            <p className="py-4 text-3xl underline">Finished 🎉</p>
          </div>
          <div className="my-4 flex flex-col items-center ">
            <div className="w-36">
              <div className="mb-2">
                <FilledButton
                  type="button"
                  action={() => {
                    continueTrackTime(
                      previousCurrentTrackTime.track_time_name.id,
                    );
                  }}
                  classes="w-full"
                >
                  Continue{' '}
                  <span className="ml-2">
                    <PlaySVG
                      className="w-4 h-auto"
                      title="Continue current track time name"
                    />
                  </span>
                </FilledButton>
              </div>
              <div className="mb-2">
                <FilledButton
                  action={() => continueTrackTime(breakTime.id)}
                  classes="w-full"
                >
                  Take a Break{' '}
                  <span className="ml-2">
                    <PlaySVG
                      className="w-4 h-auto"
                      title="Start tracking your break"
                    />
                  </span>
                </FilledButton>
              </div>
              <Button
                action={() => onModalButton(finished)}
                classes="pt-2 w-full"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CurrentTrackTimeContent.propTypes = {
  currentTrackTime: PropTypes.object.isRequired,
  onModalButton: PropTypes.func.isRequired,
  timeTrackerEnablePomodoro: PropTypes.bool.isRequired,
  timeTrackerPomodoroIntervalTime: PropTypes.string,
  endTrackTimeTimer: PropTypes.func.isRequired,
  startTrackTimeTimer: PropTypes.func.isRequired,
  breakTime: PropTypes.object.isRequired,
  timeTrackerBreakIntervalTime: PropTypes.string.isRequired,
  isShowing: PropTypes.bool,
};

export default connect(
  (state) => ({
    timeTrackerEnablePomodoro: getTimeTrackerEnablePomodoroSelector(state),
    timeTrackerPomodoroIntervalTime: getTimeTrackerPomodoroIntervalTimeSelector(
      state,
    ),
    breakTime: getTrackTimeNamesBreakTimeSelector(state),
    timeTrackerBreakIntervalTime: getTimeTrackerBreakIntervalTimeSelector(
      state,
    ),
    currentTrackTime: getTrackTimeCurrentTrackTimeSelector(state),
  }),
  {
    endTrackTimeTimer: endTrackTimeTimerAction,
    startTrackTimeTimer: startTrackTimeTimerAction,
  },
)(CurrentTrackTimeContent);
