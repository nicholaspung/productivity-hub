import React from 'react';
import Helmet from '../BaseComponents/Helmet';
import ViceList from './ViceList';
import AddVice from './AddVice';

const Vices = () => (
  <>
    <Helmet
      title="Vices | myexperiment.life"
      name="Vices Page"
      content="This is where you see your saved vices."
    />
    <h1 className="text-3xl font-bold text-center p-4">Vices</h1>
    <div className="flex flex-wrap justify-around mb-4 mx-4 rounded-md border-2 border-gray-200">
      <ViceList />
      <AddVice />
    </div>
  </>
);

export default Vices;
