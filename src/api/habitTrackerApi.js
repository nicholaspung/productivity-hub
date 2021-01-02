import { axiosWithAuth } from './baseApi';
import { habitUrl, todoUrl, dailiesUrl } from '../common/routes';

const transformToDateFormat = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
};

export const getHabits = async () => (await axiosWithAuth()).get(habitUrl);

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
  (await axiosWithAuth()).put(
    `${dailiesUrl}${daily.id}/?date=${daily.date}&timeframe=day`,
    {
      finished: !daily.finished,
    },
  );

export const createDailiesForDay = async (date = new Date()) =>
  (await axiosWithAuth()).post(
    `${dailiesUrl}?date=${transformToDateFormat(date)}`,
  );

export const getDailiesForDay = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=day`,
  );

export const getDailiesForWeek = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=week`,
  );

export const getDailiesForMonth = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=month`,
  );

export const getDailiesForYear = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=year`,
  );
