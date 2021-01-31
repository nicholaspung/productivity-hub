import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import TodoItem from './TodoItem';
import AddItem from '../BaseComponents/AddItem';
import {
  getTodos as getTodosAction,
  addTodo as addTodoAction,
} from '../../redux/actions/habitTrackerActions';
import {
  getTodosTodos,
  getTodosLoadingStatus,
  getTodosError,
} from '../../redux/selectors/habitTrackerSelectors';
import { FILTERS } from '../../constants/habitTrackerConstants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import EmptyItem from '../BaseComponents/EmptyItem';
import { sortedTodosForPriorityUtil } from '../../utils/habitTrackerUtils';

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
  }, [getTodos, todos]);

  const sortedTodosForPriority = sortedTodosForPriorityUtil(todos);
  const hasUnderline = (filterConstant) => {
    if (filter === filterConstant) return 'underline';
    return '';
  };

  return (
    <div className={classes || ''}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl px-5 font-bold">Todos</h1>
        <div>
          <button
            className={`${hasUnderline(FILTERS.ACTIVE)} px-2`}
            onClick={() => setFilter(FILTERS.ACTIVE)}
            type="button"
          >
            Active
          </button>
          <button
            className={`${hasUnderline(FILTERS.COMPLETED)} px-2`}
            onClick={() => setFilter(FILTERS.COMPLETED)}
            type="button"
          >
            Completed
          </button>
        </div>
      </div>
      <div className="p-4 rounded-md border-2 border-gray-200 bg-white">
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
        {sortedTodosForPriority[0].length ? (
          <h2 className="font-bold pt-2">High Priority</h2>
        ) : null}
        <ItemList
          data={sortedTodosForPriority[0]}
          Component={TodoItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
        {sortedTodosForPriority[1].length ? (
          <h2 className="font-bold pt-2">No Priority</h2>
        ) : null}
        <ItemList
          data={sortedTodosForPriority[1]}
          Component={TodoItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
        {sortedTodosForPriority[2].length ? (
          <h2 className="font-bold pt-2">Low Priority</h2>
        ) : null}
        <ItemList
          data={sortedTodosForPriority[2]}
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
