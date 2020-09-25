import React, { useEffect } from "react";
import { connect } from "react-redux";
import ItemList from "./ItemList";
import TodoItem from "./TodoItem";
import ItemAction from "./ItemAction";
import {
  getTodos as getTodosAction,
  addTodo as addTodoAction,
} from "./redux/actions";
import { getTodosTodos, getTodosLoadingStatus } from "./redux/selectors";

const TodoList = ({ todos, getTodos, loading, addTodo }) => {
  useEffect(() => {
    if (!todos.length) {
      getTodos();
    }
  }, [getTodos, todos]);

  return (
    <div>
      <h1>Todo List</h1>
      <ItemAction labelName={"Add a Todo"} actionFunction={addTodo} />
      {loading && <p>Loading...</p>}
      {!loading && <ItemList data={todos} Component={TodoItem} />}
    </div>
  );
};

export default connect(
  (state) => ({
    todos: getTodosTodos(state),
    loading: getTodosLoadingStatus(state),
  }),
  { getTodos: getTodosAction, addTodo: addTodoAction }
)(TodoList);
