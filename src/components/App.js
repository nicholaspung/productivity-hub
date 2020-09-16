import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import HabitTracker from "./HabitTracker";
import Profile from "./User/Profile";

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute path="/habit-tracker" component={HabitTracker} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>

      <Footer />
    </>
  );
}

export default App;
