import React from 'react';
import { ReactComponent as LandingSVG } from '../../assets/icons/landing.svg';
import { ReactComponent as ListSVG } from '../../assets/icons/list.svg';
import { ReactComponent as SaverSVG } from '../../assets/icons/saver.svg';
import { DisplayContainer, DisplayContainerCard } from '../BaseComponents';
import Feature from './Feature';
import FeatureItem from './FeatureItem';
import Bubble from './Bubble';

const LandingPage = () => (
  <>
    <DisplayContainer>
      <div className="flex justify-around items-center p-5 rounded-md border-2 border-gray-200 flex-col-reverse md:flex-row">
        <div>
          <h1 className="text-center text-4xl font-bold">
            Welcome to myexperiment.life
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
        <LandingSVG className="md:h-auto p-10 h-10 h-64" />
      </div>
    </DisplayContainer>
    <DisplayContainerCard>
      <h1 className="text-center text-3xl font-bold">Features</h1>
      <div className="flex flex-wrap justify-around">
        <Feature name="Habit Tracker">
          <ListSVG className="h-48 w-auto p-10 mx-auto hidden md:block" />
          <FeatureItem>
            <p>Helps manage and track the habits you are trying to build.</p>
            <Bubble>
              Studies show that it takes on average 66 days to build a habit,
              but that&apos;s just an average. It may take 2 days to maybe
              never. Use this to visually track the habit you are trying to
              build, or make it a practice you strive to achieve every day.
            </Bubble>
          </FeatureItem>
          <FeatureItem>
            <p>
              Includes a todo list with prioritization. It&apos;s one step
              better than a regular old todo list with a little more effort.
            </p>
          </FeatureItem>
        </Feature>
        <Feature name="Post Saver">
          <SaverSVG className="h-48 w-auto p-10 mx-auto hidden md:block" />
          <FeatureItem>
            <p>
              Grabs and saves posts so you don&apos;t have to! This aggregates
              all the websites that you frequent to allow a one-stop shop of
              viewing the posts that you find interesting.
            </p>
          </FeatureItem>
          <FeatureItem>
            <p>
              Allows you to save keywords that are used to generate a list of
              posts that have been found for future reading.
            </p>
          </FeatureItem>
        </Feature>
      </div>
    </DisplayContainerCard>
  </>
);

export default LandingPage;
