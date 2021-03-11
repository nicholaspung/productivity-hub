import React from 'react';
import Feature from '../Feature';
import FeatureItem from '../FeatureItem';
import { ReactComponent as ViceSVG } from '../../../assets/icons/vice.svg';

const FeatureVices = () => (
  <Feature name="Vices">
    <ViceSVG className="h-48 w-auto p-10 mx-auto hidden md:block" />
    <FeatureItem>
      <p>
        Save links that you frequently used. This is used to track all the times
        you go to that website.
      </p>
    </FeatureItem>
    <FeatureItem>
      <p>
        Specify the timeframe needed between clicks to your saved links.
        It&apos;s called a vice because you don&apos;t know how to stop
        yourself!
      </p>
    </FeatureItem>
  </Feature>
);

export default FeatureVices;
