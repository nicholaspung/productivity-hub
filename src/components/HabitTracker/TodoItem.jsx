import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editTodo as editTodoAction,
  deleteTodo as deleteTodoAction,
  reorderTodos as reorderTodosAction,
} from '../../redux/actions/habitTrackerActions';
import { getTodosTodos } from '../../redux/selectors/habitTrackerSelectors';
import ItemAction from './ItemAction';
import {
  PRIORITIES,
  DIRECTIONS,
  displayColor,
} from '../../constants/habitTrackerConstants';
import { ReactComponent as MinusSVG } from '../../assets/icons/minus.svg';
import { ReactComponent as DoubleArrowDownSVG } from '../../assets/icons/doublearrowdown.svg';
import { ReactComponent as DoubleArrowUpSVG } from '../../assets/icons/doublearrowup.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrowup.svg';
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrowdown.svg';

const TodoItem = ({
  data,
  editTodo,
  deleteTodo,
  reorderTodos,
  todos,
  firstItem,
  lastItem,
}) => {
  const [edit, setEdit] = useState(false);

  const onCheckedChange = async () => {
    await editTodo(data.id, { finished: !data.finished, name: data.name });
  };
  const onSetPriorityTodo = (priority) => {
    editTodo(data.id, { priority, name: data.name });
  };
  const onReorderTodo = (direction, priority) => {
    const filteredTodos = todos.filter(
      (item) => !item.finished && item.priority === priority,
    );
    const currentIdx = filteredTodos.findIndex((el) => el.id === data.id);
    if (direction === DIRECTIONS.UP) {
      if (currentIdx - 1 < 0) return;
      reorderTodos(data.id, filteredTodos[currentIdx - 1].id);
    } else {
      if (currentIdx + 1 > filteredTodos.length - 1) return;
      reorderTodos(data.id, filteredTodos[currentIdx + 1].id);
    }
  };
  const onDeleteTodo = () => {
    deleteTodo(data.id);
  };

  const labelId = data.name.replace(/ /, '');

  return (
    <li className="p-1 border-t-2 border-gray-200 flex justify-between items-center">
      <div>
        <div className="flex items-center">
          <label
            htmlFor={labelId}
            className={`flex items-center p-4 border border-transparent rounded-md transition ease-in-out duration-150 cursor-pointer ${
              displayColor({ priority: data.priority })[0]
            }`}
          >
            <input
              id={labelId}
              type="checkbox"
              checked={data.finished}
              onChange={onCheckedChange}
              className={`form-checkbox w-6 h-6 cursor-pointer ${
                displayColor({ priority: data.priority })[1]
              }`}
            />
          </label>
          <div className="flex flex-col px-4">
            <span className="font-semibold">{data.name}</span>
            <span className="text-xs whitespace-pre-line">
              {data.description}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end w-16">
        <button onClick={() => setEdit(!edit)} type="button">
          <EditSVG className="w-4 h-auto" title="Edit todo" />
        </button>
        {edit && (
          <ItemAction
            data={data}
            labelName="Edit Todo"
            actionFunction={editTodo}
            displayFunction={() => setEdit(!edit)}
          />
        )}
        <div className="flex">
          <button
            onClick={() => onSetPriorityTodo(PRIORITIES.HIGH)}
            type="button"
          >
            <DoubleArrowUpSVG
              className="w-4 h-auto"
              title="Set high priority"
            />
          </button>
          <button
            onClick={() => onSetPriorityTodo(PRIORITIES.NONE)}
            type="button"
          >
            <MinusSVG className="w-4 h-auto" title="Set no priority" />
          </button>
          <button
            onClick={() => onSetPriorityTodo(PRIORITIES.LOW)}
            type="button"
          >
            <DoubleArrowDownSVG
              className="w-4 h-auto"
              title="Set low priority"
            />
          </button>
        </div>
        <div>
          {!firstItem && (
            <button
              onClick={() => onReorderTodo(DIRECTIONS.UP, data.priority)}
              type="button"
            >
              <ArrowUpSVG className="w-4 h-auto" title="Move todo up" />
            </button>
          )}
          {!lastItem && (
            <button
              onClick={() => onReorderTodo(DIRECTIONS.DOWN, data.priority)}
              type="button"
            >
              <ArrowDownSVG className="w-4 h-auto" title="Move todo down" />
            </button>
          )}
        </div>
        <button onClick={onDeleteTodo} type="button">
          <DeleteSVG className="w-4 h-auto" title="Delete todo" />
        </button>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  data: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  reorderTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  firstItem: PropTypes.bool.isRequired,
  lastItem: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    todos: getTodosTodos(state),
  }),
  {
    editTodo: editTodoAction,
    deleteTodo: deleteTodoAction,
    reorderTodos: reorderTodosAction,
  },
)(TodoItem);
