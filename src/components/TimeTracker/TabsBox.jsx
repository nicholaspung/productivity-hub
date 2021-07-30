import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TabsBox = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0] && tabs[0].id);

  return (
    <div className="flex w-full flex-col m-4 md:flex-1">
      <div className="flex justify-center border-t-2 border-l-2 border-r-2 rounded-md rounded-b-none">
        {tabs.map((tab) => (
          <button
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? 'bg-indigo-600' : 'bg-white-600'
            } w-full p-2 rounded-md rounded-b-none first:rounded-r-none last:rounded-l-none`}
            key={tab.id}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="rounded-b-md border-2 border-gray-200">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <tab.component key={tab.id} {...tab.componentProps} />
            ),
        )}
      </div>
    </div>
  );
};

TabsBox.propTypes = {
  tabs: PropTypes.array.isRequired,
};

export default TabsBox;
