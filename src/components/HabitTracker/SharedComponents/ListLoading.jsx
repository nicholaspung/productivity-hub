import React from 'react';
import { ReactComponent as LoadingSVG } from '../../../assets/icons/loading.svg';

const ListLoading = () => (
  <div className="h-0 flex justify-end ">
    <div className="relative bottom-2 right-5">
      <LoadingSVG className="w-6 h-auto animate-spin absolute" />
    </div>
  </div>
);

export default ListLoading;
