import React from "react";
import { connect } from "react-redux";
import {
  editTodo as editTodoAction,
  deleteTodo as deleteTodoAction,
  reorderTodos as reorderTodosAction,
} from "./redux/actions";
import { getTodosTodos } from "./redux/selectors";
import ItemAction from "./ItemAction";
import { PRIORITIES, DIRECTIONS } from "./constants";

const TodoItem = ({ data, editTodo, deleteTodo, reorderTodos, todos }) => {
  const onCheckedChange = async () => {
    await editTodo(data.id, { finished: !data.finished, name: data.name });
  };
  const onSetPriorityTodo = (priority) => {
    editTodo(data.id, { priority, name: data.name });
  };
  const onReorderTodo = (direction) => {
    const priority = data.priority;
    const filteredTodos = todos.filter(
      (item) => priority === item.priority && !data.finished
    );
    const currentIdx = filteredTodos.findIndex((el) => el.id === data.id);
    if (direction === DIRECTIONS.UP) {
      if (currentIdx - 1 < 0) return;
      reorderTodos(data.id, filteredTodos[currentIdx - 1].id);
    } else {
      if (currentIdx + 1 > filteredTodos.length) return;
      reorderTodos(data.id, filteredTodos[currentIdx + 1].id);
    }
  };
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
        <button onClick={() => onReorderTodo(DIRECTIONS.UP)}>Move Up</button>
        <button onClick={() => onReorderTodo(DIRECTIONS.DOWN)}>
          Move Down
        </button>
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

export default connect(
  (state) => ({
    todos: getTodosTodos(state),
  }),
  {
    editTodo: editTodoAction,
    deleteTodo: deleteTodoAction,
    reorderTodos: reorderTodosAction,
  }
)(TodoItem);
