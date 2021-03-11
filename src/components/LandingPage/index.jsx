import React from 'react';
import { ReactComponent as LandingSVG } from '../../assets/icons/achievement.svg';
import { DisplayContainer, DisplayContainerCard } from '../BaseComponents';
import FeatureHabitTracker from './Features/FeatureHabitTracker';
import FeatureVices from './Features/FeatureVices';

const LandingPage = () => (
  <>
    <DisplayContainer>
      <div className="flex justify-around items-center p-5 rounded-md border-2 border-gray-200 flex-col-reverse md:flex-row">
        <div>
          <h1 className="text-center text-4xl font-bold">
            Welcome to my experiment(al) life
          </h1>
          <div className="p-4">
            <p>
              This is a place to store high-level productivity tools for use.
            </p>
            <br />
            <p>
              Pick and choose which tool you want to use and see if it helps you
              achieve your goals. If it doesn&apos;t help, stop using it, and
              try another.
            </p>
            <br />
            <p className="text-xl underline">
              Life&apos;s an experiment. Find out what helps you achieve your
              goals.
            </p>
          </div>
        </div>
        <LandingSVG className="md:h-auto p-10 h-10 h-64 max-w-xs md:w-auto" />
      </div>
    </DisplayContainer>
    <DisplayContainerCard>
      <h1 className="text-center text-3xl font-bold">Features</h1>
      <div className="flex flex-wrap justify-around">
        <FeatureHabitTracker />
        <FeatureVices />
      </div>
    </DisplayContainerCard>
  </>
);

export default LandingPage;
