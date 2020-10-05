import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import HabitTracker from './HabitTracker';
import PostSaver from './PostSaver';
import Profile from './User/Profile';
import { Main } from './BaseComponents';
import Banner from './Banner';
import Helmet from './BaseComponents/Helmet';

const App = () => (
  <>
    <Helmet
      title="Welcome! | myexperiment.life"
      name="Homepage"
      content="A collection of tools to help you live your best life."
    />
    <Banner />
    <Header />
    <Main>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute path="/post-saver" component={PostSaver} />
        <PrivateRoute path="/habit-tracker" component={HabitTracker} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </Main>

    <Footer />
  </>
);

export default App;
