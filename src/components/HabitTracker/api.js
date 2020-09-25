import { axiosWithAuth } from "../../api";

const habitUrl = "/habits/";
const todoUrl = "/todos/";
const dailiesUrl = "/dailies/";

const transformToDateFormat = (date) => {
  let month = date.getMonth() + 1;
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

export const addHabit = async (habit) =>
  (await axiosWithAuth()).post(habitUrl, habit);

export const editHabit = async (id, habit) =>
  (await axiosWithAuth()).put(`${habitUrl}${id}/`, habit);

export const reorderHabits = async (firstId, secondId) =>
  (await axiosWithAuth()).patch(`${habitUrl}${firstId}/`, {
    reorder: secondId,
  });

export const deleteHabit = async (id) =>
  (await axiosWithAuth()).delete(`${habitUrl}${id}/`);

export const getTodos = async () => (await axiosWithAuth()).get(todoUrl);

export const addTodo = async (todo) =>
  (await axiosWithAuth()).post(todoUrl, todo);

export const editTodo = async (id, todo) =>
  (await axiosWithAuth()).put(`${todoUrl}${id}/`, todo);

export const reorderTodos = async (firstId, secondId) =>
  (await axiosWithAuth()).patch(`${todoUrl}${firstId}/`, { reorder: secondId });

export const deleteTodo = async (id) =>
  (await axiosWithAuth()).delete(`${todoUrl}${id}/`);

export const toggleDaily = async (daily) =>
  (await axiosWithAuth()).put(`${dailiesUrl}${daily.id}/`, {
    finished: !daily.finished,
  });

export const createDailiesForToday = async () =>
  (await axiosWithAuth()).post(dailiesUrl);

export const getDailiesForToday = async () =>
  (await axiosWithAuth()).get(dailiesUrl);

export const getDailiesForWeek = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=week`
  );

export const getDailiesForMonth = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=month`
  );

export const getDailiesForYear = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=year`
  );

export const toggleDailies = async (id, daily) =>
  (await axiosWithAuth()).put(`${dailiesUrl}${id}/`, daily);
