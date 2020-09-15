import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserLoadingScreen from "./User/UserLoadingScreen";
import LandingPage from "./LandingPage";
import HabitTracker from "./HabitTracker";
import Profile from "./User/Profile";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <UserLoadingScreen />
      <Header />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/habit-tracker" component={HabitTracker} />
        <Route path="/profile" component={Profile} />
      </Switch>

      <Footer />
    </>
  );
}

export default App;
