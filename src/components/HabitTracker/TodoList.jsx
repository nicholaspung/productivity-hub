import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './SharedComponents/ItemList';
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
  getTodosCache,
} from '../../redux/selectors/habitTrackerSelectors';
import { FILTERS } from '../../constants/habitTrackerConstants';
import EmptyItem from '../BaseComponents/EmptyItem';
import { sortedTodosForPriorityUtil } from '../../utils/habitTrackerUtils';
import ListLoading from './SharedComponents/ListLoading';
import ListRefresh from './SharedComponents/ListRefresh';

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
  cache,
}) => {
  const [filter, setFilter] = useState(FILTERS.ACTIVE);

  useEffect(() => {
    if (!cache) {
      getTodos();
    }
  }, [getTodos, cache]);

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
        {loading && <ListLoading />}
        {!loading && <ListRefresh action={getTodos} />}
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
        {sortedTodosForPriority[0].filter(getFilterFunction(filter)).length ? (
          <h2 className="font-bold pt-2">High Priority</h2>
        ) : null}
        <ItemList
          data={sortedTodosForPriority[0]}
          Component={TodoItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
        {sortedTodosForPriority[1].filter(getFilterFunction(filter)).length ? (
          <h2 className="font-bold pt-2">No Priority</h2>
        ) : null}
        <ItemList
          data={sortedTodosForPriority[1]}
          Component={TodoItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
        {sortedTodosForPriority[2].filter(getFilterFunction(filter)).length ? (
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
  cache: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    todos: getTodosTodos(state),
    cache: getTodosCache(state),
    loading: getTodosLoadingStatus(state),
    error: getTodosError(state),
  }),
  { getTodos: getTodosAction, addTodo: addTodoAction },
)(TodoList);
