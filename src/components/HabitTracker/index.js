import React from "react";
import axios from "axios";
import { getIdToken } from "../../firebase/utils";

const HabitTracker = () => {
  const fetchCall = async () => {
    try {
      const token = await getIdToken();
      const response = await axios.get("http://127.0.0.1:8000/api/users/", {
        headers: {
          authorization: token,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      Habit Tracker<button onClick={fetchCall}>Call</button>
    </div>
  );
};

export default HabitTracker;
