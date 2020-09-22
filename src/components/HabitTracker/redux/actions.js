import {
  getDailiesForToday as getDailiesForTodayAPI,
  getTodos as getTodosAPI,
  addHabit as addHabitAPI,
  addTodo as addTodoAPI,
  editHabit as editHabitAPI,
  deleteHabit as deleteHabitAPI,
  reorderHabits as reorderHabitsAPI,
  editTodo as editTodoAPI,
  deleteTodo as deleteTodoAPI,
  reorderTodos as reorderTodosAPI,
  toggleDaily as toggleDailyAPI,
} from "../api";

export const HABITS_UPDATING = "HABITS_UPDATING";
export const HABITS_UPDATING_DONE = "HABITS_UPDATING_DONE";
export const HABITS_UPDATING_ERROR = "HABITS_UPDATING_ERROR";
export const HABITS_DELETING = "HABITS_DELETING";
export const HABITS_DELETING_DONE = "HABITS_DELETING_DONE";
export const HABITS_DELETING_ERROR = "HABITS_DELETING_ERROR";
export const TODOS_FETCHING = "TODOS_FETCHING";
export const TODOS_FETCHING_DONE = "TODOS_FETCHING_DONE";
export const TODOS_FETCHING_ERROR = "TODOS_FETCHING_ERROR";
export const TODOS_ADDING = "TODOS_ADDING";
export const TODOS_ADDING_DONE = "TODOS_ADDING_DONE";
export const TODOS_ADDING_ERROR = "TODOS_ADDING_ERROR";
export const TODOS_EDITING = "TODOS_EDITING";
export const TODOS_EDITING_DONE = "TODOS_EDITING_DONE";
export const TODOS_EDITING_ERROR = "TODOS_EDITING_ERROR";
export const TODOS_DELETING = "TODOS_DELETING";
export const TODOS_DELETING_DONE = "TODOS_DELETING_DONE";
export const TODOS_DELETING_ERROR = "TODOS_DELETING_ERROR";
export const TODOS_REORDERING = "TODOS_REORDERING";
export const TODOS_REORDERING_DONE = "TODOS_REORDERING_DONE";
export const TODOS_REORDERING_ERROR = "TODOS_REORDERING_ERROR";
export const DAILIES_FETCHING = "DAILIES_FETCHING";
export const DAILIES_FETCHING_DONE = "DAILIES_FETCHING_DONE";
export const DAILIES_FETCHING_ERROR = "DAILIES_FETCHING_ERROR";
export const DAILIES_TOGGLE = "DAILIES_TOGGLE";
export const DAILIES_TOGGLE_DONE = "DAILIES_TOGGLE_DONE";
export const DAILIES_TOGGLE_ERROR = "DAILIES_TOGGLE_ERROR";

export const toggleDaily = (daily) => async (dispatch, getState) => {
  dispatch({ type: DAILIES_TOGGLE });
  const { dailies } = getState();
  const dailiesCopy = [...dailies.dailies];
  try {
    const response = await toggleDailyAPI(daily);
    dailiesCopy[
      dailies.dailies.findIndex((el) => el.id === response.id)
    ] = response;
    return dispatch({ type: DAILIES_TOGGLE_DONE, payload: dailiesCopy });
  } catch (err) {
    return dispatch({ type: DAILIES_TOGGLE_ERROR, payload: err });
  }
};

export const getDailiesForToday = () => async (dispatch) => {
  dispatch({ type: DAILIES_FETCHING });
  try {
    const data = await getDailiesForTodayAPI();
    data.sort((a, b) => {
      if (a.habit.order > b.habit.order) {
        return 1;
      } else if (a.habit.order < b.habit.order) {
        return -1;
      } else {
        return 0;
      }
    });
    return dispatch({ type: DAILIES_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: DAILIES_FETCHING_ERROR, payload: err });
  }
};

export const addHabit = (habit) => async (dispatch) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    await addHabitAPI(habit);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};

export const editHabit = (id, habit) => async (dispatch) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    await editHabitAPI(id, habit);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};

export const reorderHabits = (firstId, secondId) => async (dispatch) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    await reorderHabitsAPI(firstId, secondId);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};

export const deleteHabit = (id) => async (dispatch) => {
  dispatch({ type: HABITS_DELETING });
  try {
    await deleteHabitAPI(id);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_DELETING_ERROR, payload: err });
  }
};

const todosSortFunction = (a, b) => {
  if (a.order > b.order) {
    return 1;
  } else if (a.order < b.order) {
    return -1;
  } else {
    return 0;
  }
};

export const getTodos = () => async (dispatch) => {
  dispatch({ type: TODOS_FETCHING });
  try {
    const data = await getTodosAPI();
    data.sort(todosSortFunction);
    return dispatch({ type: TODOS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: TODOS_FETCHING_ERROR, payload: err });
  }
};

export const addTodo = (todo) => async (dispatch, getState) => {
  dispatch({ type: TODOS_ADDING });
  const { todos } = getState();
  try {
    const response = await addTodoAPI(todo);
    return dispatch({
      type: TODOS_ADDING_DONE,
      payload: [...todos.todos, response],
    });
  } catch (err) {
    return dispatch({ type: TODOS_ADDING_ERROR, payload: err });
  }
};

export const editTodo = (id, todo) => async (dispatch, getState) => {
  dispatch({ type: TODOS_EDITING });
  const { todos } = getState();
  try {
    const response = await editTodoAPI(id, todo);
    const todosCopy = [...todos.todos];
    todosCopy[todos.todos.findIndex((el) => el.id === response.id)] = response;
    return dispatch({ type: TODOS_EDITING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_EDITING_ERROR, payload: err });
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  dispatch({ type: TODOS_DELETING });
  const { todos } = getState();
  const idIndex = todos.todos.findIndex((el) => el.id === id);
  try {
    await deleteTodoAPI(id);
    const todosCopy = [...todos.todos];
    todosCopy.splice(idIndex, 1);
    return dispatch({ type: TODOS_DELETING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_DELETING_ERROR });
  }
};

export const reorderTodos = (firstId, secondId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TODOS_REORDERING });
  const { todos } = getState();
  try {
    const response = await reorderTodosAPI(firstId, secondId);
    const todosCopy = [...todos.todos];
    response.forEach((todo) => {
      const index = todosCopy.findIndex((el) => el.id === todo.id);
      todosCopy[index] = todo;
    });
    todosCopy.sort(todosSortFunction);
    return dispatch({ type: TODOS_REORDERING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_REORDERING_ERROR, payload: err });
  }
};
