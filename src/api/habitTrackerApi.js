import { axiosWithAuth } from './baseApi';
import { habitUrl, todoUrl, dailiesUrl } from '../common/routes';
import { getDateTransform } from '../utils/dateUtils';

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
  (await axiosWithAuth()).post(`${dailiesUrl}?date=${getDateTransform(date)}`);

export const getDailiesForDay = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${getDateTransform(date)}&timeframe=day`,
  );

export const getDailiesForWeek = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${getDateTransform(date)}&timeframe=week`,
  );

export const getDailiesForMonth = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${getDateTransform(date)}&timeframe=month`,
  );

export const getDailiesForYear = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${dailiesUrl}?date=${getDateTransform(date)}&timeframe=year`,
  );
