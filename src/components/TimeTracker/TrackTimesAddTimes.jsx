import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  smallerFormInputClassName,
  FilledButton,
  Button,
} from '../BaseComponents';
import { getTrackTimeNames as getTrackTimeNamesSelector } from '../../redux/selectors/timeTrackerSelectors';
import {
  getDateTransform,
  getSecondsFromStartTimeToEndTime,
  getDateFromTimeTrackerTimes,
  displayHourMinSecTime,
  simplifyDisplayTime,
} from '../../utils/dateUtils';
import { addTrackTime as addTrackTimeAction } from '../../redux/actions/timeTrackerActions';

export const TrackTimesAddTimes = ({
  trackTimeNames,
  actionFunction,
  data,
  toggle,
  labelTitle = 'Add Time',
}) => {
  const hasData = Boolean(data && data.id);
  const today = new Date();
  const defaultTimeName =
    (hasData && data.track_time_name.name) || trackTimeNames[0].name;
  const [timeName, setTimeName] = useState(defaultTimeName);
  const [date, setDate] = useState(getDateTransform(today));
  const [dateError, setDateError] = useState('');
  const [startTime, setStartTime] = useState(
    simplifyDisplayTime(hasData && data.start_time) || '',
  );
  const [startTimeError, setStartTimeError] = useState('');
  const [endTime, setEndTime] = useState(
    simplifyDisplayTime(hasData && data.end_time) || '',
  );
  const [endTimeError, setEndTimeError] = useState('');
  const [totalTime, setTotalTime] = useState(
    (hasData && displayHourMinSecTime(data.total_time, false)) || '',
  );
  const [totalTimeError, setTotalTimeError] = useState('');
  const [notes, setNotes] = useState((hasData && data.notes) || '');

  // TODO: do text validation on Start Time, End Time, and Total Time inputs
  // const onStartEndTimeBlur = (event) => {
  const onStartEndTimeBlur = () => {
    //   let textState;
    //   const { target: { value, name } } = event
    //   if (name === 'start-time') {
    //     textState = startTime
    //   } else {
    //     textState = endTime
    //   }

    //   textState.replace(/[a-z]*/, '')
    //   if (value.length < 8) {
    //   } else if (value.length > 8) {
    //   } else {
    //   }
    if (startTime && endTime) {
      const currentTotalTime = getSecondsFromStartTimeToEndTime(
        getDateFromTimeTrackerTimes(startTime),
        getDateFromTimeTrackerTimes(endTime),
      );
      const totalTimeDisplay = displayHourMinSecTime(currentTotalTime, false);
      if (totalTimeDisplay[0] !== '-') {
        setTotalTime(totalTimeDisplay);
      } else {
        setTotalTime('');
      }
    }
    // also add for when there's a start time and total time | end time and total
  };

  const onClearForm = (settings = { resetName: true }) => {
    if (!data) {
      if (settings.resetName) {
        setTimeName(defaultTimeName);
      }
      setDate(getDateTransform(today));
      setStartTime('');
      setEndTime('');
      setTotalTime('');
      setNotes('');
    }
  };

  // Need to add error validation AND check trackNames after you add one
  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!date) {
      setDateError('Required');
    }
    if (!startTime) {
      setStartTimeError('Required');
    }
    if (!endTime && !totalTime) {
      setEndTimeError('Required');
      setTotalTimeError('Required');
    }

    if (!date || !startTime || !endTime || !totalTime) {
      return;
    }

    const startTimeDate = getDateFromTimeTrackerTimes(startTime, date);
    const endTimeDate = getDateFromTimeTrackerTimes(endTime, date);
    const totalTimeSeconds = getSecondsFromStartTimeToEndTime(
      startTimeDate,
      endTimeDate,
    );
    const newTime = {
      date,
      start_time: startTimeDate,
      end_time: endTimeDate,
      total_time: totalTimeSeconds, // need to send in seconds
      notes,
    };
    // need to add a spot to do validation here
    if (startTimeDate && endTimeDate) {
      delete newTime.total_time;
    }

    let trackTimeNameId;
    if (hasData) {
      trackTimeNameId = data.track_time_name.id;
      newTime.track_time_name = trackTimeNameId;
      await actionFunction(data.id, newTime);
    } else {
      const trackTimeNameIdx = trackTimeNames.findIndex(
        (el) => el.name === timeName,
      );
      trackTimeNameId = trackTimeNames[trackTimeNameIdx].id;
      newTime.track_time_name = trackTimeNameId;
      await actionFunction(newTime);
    }

    onClearForm({ resetName: false });
    if (toggle) {
      toggle();
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">{labelTitle}</h1>
        <label htmlFor="track-time-name-filter">
          <span className="w-full text-xs">Name</span>
          <div className="relative">
            {hasData ? (
              <div
                className={`form-input ${smallerFormInputClassName} cursor-not-allowed`}
              >
                {data.track_time_name.name}
              </div>
            ) : (
              <select
                id="track-time-name-filter"
                onChange={(event) => setTimeName(event.target.value)}
                className={smallerFormInputClassName}
                value={timeName}
              >
                {trackTimeNames.map((tTName) => (
                  <option key={tTName.id}>{tTName.name}</option>
                ))}
              </select>
            )}
          </div>
        </label>
        <label htmlFor="date-picker">
          <span className="w-full text-xs">Date</span>
          <input
            className={`form-input ${smallerFormInputClassName}`}
            type="date"
            id="date-picker"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setDateError('');
            }}
          />
          {dateError && <p className="text-xs text-red-500">{dateError}</p>}
        </label>
        <label htmlFor="start-time">
          <span className="w-full text-xs">Start Time</span>
          <input
            id="start-time"
            type="text"
            placeholder="00:00 AM"
            value={startTime}
            className={smallerFormInputClassName}
            onChange={(event) => {
              setStartTime(event.target.value);
              setStartTimeError('');
            }}
            autoComplete="off"
            onBlur={onStartEndTimeBlur}
          />
          {startTimeError && (
            <p className="text-xs text-red-500">{startTimeError}</p>
          )}
        </label>
        <label htmlFor="end-time">
          <span className="w-full text-xs">End Time</span>
          <input
            className={smallerFormInputClassName}
            type="text"
            id="end-time"
            placeholder="00:00 AM"
            value={endTime}
            onChange={(event) => {
              setEndTime(event.target.value);
              setEndTimeError('');
            }}
            autoComplete="off"
            onBlur={onStartEndTimeBlur}
          />
          {endTimeError && (
            <p className="text-xs text-red-500">{endTimeError}</p>
          )}
        </label>
        <label htmlFor="total-time">
          <span className="w-full text-xs">Total Time</span>
          <input
            className={smallerFormInputClassName}
            type="text"
            id="total-time"
            placeholder="0:00:00"
            value={totalTime}
            onChange={(event) => {
              setTotalTime(event.target.value);
              setTotalTimeError('');
            }}
            autoComplete="off"
          />
          {totalTimeError && (
            <p className="text-xs text-red-500">{totalTimeError}</p>
          )}
        </label>
        <label htmlFor="notes">
          <span className="w-full text-xs">Notes</span>
          <textarea
            className={smallerFormInputClassName}
            type="text"
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="flex py-4">
          <FilledButton action={onSubmitForm} classes="flex-1 w-full">
            Add
          </FilledButton>
          <Button action={hasData ? toggle : onClearForm} classes="flex-1">
            {hasData ? 'Cancel' : 'Clear'}
          </Button>
        </div>
      </div>
    </form>
  );
};

TrackTimesAddTimes.propTypes = {
  trackTimeNames: PropTypes.array,
  actionFunction: PropTypes.func,
  data: PropTypes.object,
  toggle: PropTypes.func,
  labelTitle: PropTypes.string,
};

const ConnectedTrackTimesAddTImes = connect(
  (state) => ({
    trackTimeNames: getTrackTimeNamesSelector(state),
  }),
  { actionFunction: addTrackTimeAction },
)(TrackTimesAddTimes);

export default ConnectedTrackTimesAddTImes;
