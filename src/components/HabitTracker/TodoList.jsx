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
import { DisplayContainer, DisplayContainerCard } from '../BaseComponents';
import { FILTERS } from './constants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import EmptyItem from '../BaseComponents/EmptyItem';

const getFilterFunction = (filter) => {
  if (filter === FILTERS.ACTIVE) return (item) => !item.finished;
  return (item) => item.finished;
};

const TodoList = ({ todos, getTodos, loading, addTodo, classes, error }) => {
  const [filter, setFilter] = useState(FILTERS.ACTIVE);

  useEffect(() => {
    if (!todos.length) {
      getTodos();
    }
    // eslint-disable-next-line
  }, [getTodos]);

  return (
    <DisplayContainer classes={classes || ''}>
      <div className="flex justify-between items-end">
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
      <DisplayContainerCard>
        {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
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
          data={todos}
          Component={TodoItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
      </DisplayContainerCard>
    </DisplayContainer>
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

TodoList.defaultProps = {
  classes: '',
  loading: false,
  todos: [],
};

export default connect(
  (state) => ({
    todos: getTodosTodos(state),
    loading: getTodosLoadingStatus(state),
    error: getTodosError(state),
  }),
  { getTodos: getTodosAction, addTodo: addTodoAction },
)(TodoList);
