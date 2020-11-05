import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import TodoItem from './TodoItem';
import AddItem from '../BaseComponents/AddItem';
import {
  getTodos as getTodosAction,
  addTodo as addTodoAction,
} from './redux/actions';
import {
  getTodosTodos,
  getTodosLoadingStatus,
  getTodosError,
} from './redux/selectors';
import { FILTERS, PRIORITIES } from './constants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import EmptyItem from '../BaseComponents/EmptyItem';

const getFilterFunction = (filter) => {
  if (filter === FILTERS.ACTIVE) return (item) => !item.finished;
  return (item) => item.finished;
};

const TodoList = ({
  todos = [],
  getTodos,
  loading = false,
  addTodo,
  classes = '',
  error,
}) => {
  const [filter, setFilter] = useState(FILTERS.ACTIVE);

  useEffect(() => {
    if (!todos.length) {
      getTodos();
    }
    // eslint-disable-next-line
  }, [getTodos]);

  const sortedTodosForPriority = (todos) => {
    const lowPriority = [];
    const noPriority = [];
    const highPriority = [];
    todos.forEach((todo) => {
      if (todo.priority === PRIORITIES.LOW) {
        lowPriority.push(todo);
      } else if (todo.priority === PRIORITIES.NONE) {
        noPriority.push(todo);
      } else {
        highPriority.push(todo);
      }
    });
    return [...highPriority, ...noPriority, ...lowPriority];
  };

  return (
    <div className={classes || ''}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl px-5 font-bold">Todos</h1>
        <div>
          <button
            className={`${filter === FILTERS.ACTIVE ? 'underline' : ''} px-2`}
            onClick={() => setFilter(FILTERS.ACTIVE)}
            type="button"
          >
            Active
          </button>
          <button
            className={`${
              filter === FILTERS.COMPLETED ? 'underline' : ''
            } px-2`}
            onClick={() => setFilter(FILTERS.COMPLETED)}
            type="button"
          >
            Completed
          </button>
        </div>
      </div>
      <div className="p-4 rounded-md border-2 border-gray-200">
        {loading && (
          <div className="h-0 flex justify-end ">
            <div className="relative bottom-3 right-3">
              <LoadingSVG className="w-6 h-auto animate-spin absolute" />
            </div>
          </div>
        )}
        <AddItem
          addItem={addTodo}
          labelTitle="Add a todo"
          labelButton="Add New Todo"
          placeholder="Add..."
          property="name"
          classes="mt-2"
        />
        <EmptyItem
          length={todos.filter(getFilterFunction(filter)).length}
          loading={loading}
          error={error}
          message="You have no todos for this category."
        />
        <ItemList
          data={sortedTodosForPriority(todos)}
          Component={TodoItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  getTodos: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  addTodo: PropTypes.func.isRequired,
  classes: PropTypes.string,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    todos: getTodosTodos(state),
    loading: getTodosLoadingStatus(state),
    error: getTodosError(state),
  }),
  { getTodos: getTodosAction, addTodo: addTodoAction },
)(TodoList);
