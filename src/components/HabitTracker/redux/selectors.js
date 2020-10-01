export const getDailiesState = (store) => store.dailies;
export const getDailiesDailies = (store) => getDailiesState(store).dailies;
export const getDailiesLoadingStatus = (store) =>
  getDailiesState(store).loading;
export const getDailiesDailiesCache = (store) =>
  getDailiesState(store).dailiesCache;

export const getTodosState = (store) => store.todos;
export const getTodosTodos = (store) => getTodosState(store).todos;
export const getTodosLoadingStatus = (store) => getTodosState(store).loading;
