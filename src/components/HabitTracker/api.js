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

export const getHabits = async () => {
  try {
    const response = await (await axiosWithAuth()).get(habitUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addHabit = async (habit) => {
  try {
    const response = await (await axiosWithAuth()).post(habitUrl, habit);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const editHabit = async (id, habit) => {
  try {
    const response = await (await axiosWithAuth()).patch(
      `${habitUrl}${id}/`,
      habit
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const reorderHabits = async (firstId, secondId) => {
  try {
    const response = await (
      await axiosWithAuth()
    ).patch(`${habitUrl}${firstId}/`, { reorder: secondId });
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteHabit = async (id) => {
  try {
    const response = await (await axiosWithAuth()).delete(`${habitUrl}${id}/`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getTodos = async () => {
  try {
    const response = await (await axiosWithAuth()).get(todoUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await (await axiosWithAuth()).post(todoUrl, todo);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const editTodo = async (id, todo) => {
  try {
    const response = await (await axiosWithAuth()).patch(
      `${todoUrl}${id}/`,
      todo
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const reorderTodos = async (firstId, secondId) => {
  try {
    const response = await (
      await axiosWithAuth()
    ).patch(`${todoUrl}${firstId}/`, { reorder: secondId });
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await (await axiosWithAuth()).delete(`${todoUrl}${id}/`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDailiesForToday = async () => {
  try {
    const response = await (await axiosWithAuth()).get(dailiesUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDailiesForWeek = async (date = new Date()) => {
  try {
    const response = await (await axiosWithAuth()).get(
      `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=week`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDailiesForMonth = async (date = new Date()) => {
  try {
    const response = await (await axiosWithAuth()).get(
      `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=month`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDailiesForYear = async (date = new Date()) => {
  try {
    const response = await (await axiosWithAuth()).get(
      `${dailiesUrl}?date=${transformToDateFormat(date)}&timeframe=year`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const toggleDailies = async (id, daily) => {
  try {
    const response = await (await axiosWithAuth()).put(
      `${dailiesUrl}${id}/`,
      daily
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
