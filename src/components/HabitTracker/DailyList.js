import React, { useEffect } from "react";
import { connect } from "react-redux";
import ItemList from "./ItemList";
import DailyItem from "./DailyItem";
import ItemAction from "./ItemAction";
import {
  getDailiesForToday as getDailiesForTodayAction,
  addHabit as addHabitAction,
} from "./redux/actions";
import { getDailiesDailies, getDailiesLoadingStatus } from "./redux/selectors";

const DailyList = ({ dailies, getDailiesForToday, loading, addHabit }) => {
  useEffect(() => {
    getDailiesForToday();
  }, [getDailiesForToday]);
  return (
    <div>
      <h1>Habit Tracker</h1>
      <ItemAction labelName={"Add a Habit"} actionFunction={addHabit} />
      {loading && <p>Loading...</p>}
      {!loading && <ItemList data={dailies} Component={DailyItem} />}
    </div>
  );
};

export default connect(
  (state) => ({
    dailies: getDailiesDailies(state),
    loading: getDailiesLoadingStatus(state),
  }),
  { getDailiesForToday: getDailiesForTodayAction, addHabit: addHabitAction }
)(DailyList);
