import React from "react";
import { connect } from "react-redux";
import {
  editTodo as editTodoAction,
  deleteTodo as deleteTodoAction,
  reorderTodos as reorderTodosAction,
} from "./redux/actions";
import ItemAction from "./ItemAction";

const PRIORITIES = {
  HIGH: "HIGH",
  NONE: "NONE",
  LOW: "LOW",
};

const TodoItem = ({ data, editTodo, deleteTodo, reorderTodos }) => {
  const onCheckedChange = () => {
    editTodo(data.id, { finished: !data.finished });
  };
  const onSetPriorityTodo = (priority) => {
    editTodo(data.id, { priority });
  };
  const onReorderTodo = () => {};
  const onDeleteTodo = () => {
    deleteTodo(data.id);
  };

  const labelId = data.name.replace(/ /, "");

  return (
    <li>
      <div>
        <input
          id={labelId}
          type="checkbox"
          checked={data.finished}
          onChange={onCheckedChange}
        />
        <label htmlFor={labelId}>
          <span>{data.name}</span>
          <span>{data.description}</span>
        </label>
      </div>
      <div>
        <button>Edit Todo</button>
        <button onClick={() => onSetPriorityTodo(PRIORITIES.HIGH)}>
          Set High Priority
        </button>
        <button onClick={() => onSetPriorityTodo(PRIORITIES.NONE)}>
          Reset Priority
        </button>
        <button onClick={() => onSetPriorityTodo(PRIORITIES.LOW)}>
          Set Low Priority
        </button>
        <button>Move Up</button>
        <button>Move Down</button>
        <button onClick={onDeleteTodo}>Delete Todo</button>
      </div>
      <ItemAction
        data={data}
        labelName={"Edit Todo"}
        actionFunction={editTodo}
      />
    </li>
  );
};

export default connect(null, {
  editTodo: editTodoAction,
  deleteTodo: deleteTodoAction,
  reorderTodos: reorderTodosAction,
})(TodoItem);
