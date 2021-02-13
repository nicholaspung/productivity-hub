import React from 'react';
import { ReactComponent as LoadingSVG } from '../assets/icons/loading.svg';

const PrivateRouteLoadingScreen = () => (
  <div className="flex justify-center m-4">
    <LoadingSVG className="w-20 h-auto animate-spin" />
  </div>
);

export default PrivateRouteLoadingScreen;
