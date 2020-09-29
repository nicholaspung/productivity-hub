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
import { getTodosTodos, getTodosLoadingStatus } from './redux/selectors';
import { DisplayContainer, DisplayContainerCard } from '../BaseComponents';
import { FILTERS } from './constants';

const getFilterFunction = (filter) => {
  if (filter === FILTERS.ACTIVE) return (item) => !item.finished;
  return (item) => item.finished;
};

const TodoList = ({ todos, getTodos, loading, addTodo, classes }) => {
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
        <AddItem
          addItem={addTodo}
          labelTitle="Add a todo"
          labelButton="Add New Todo"
          placeholder="Add..."
          property="name"
        />
        {loading && <p>Loading...</p>}
        {!loading && (
          <ItemList
            data={todos}
            Component={TodoItem}
            filterFunction={getFilterFunction(filter)}
          />
        )}
      </DisplayContainerCard>
    </DisplayContainer>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    name: PropTypes.string,
    description: PropTypes.string,
    finished: PropTypes.bool,
    id: PropTypes.number,
    priority: PropTypes.string,
  }),
  getTodos: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  addTodo: PropTypes.func.isRequired,
  classes: PropTypes.string,
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
  }),
  { getTodos: getTodosAction, addTodo: addTodoAction },
)(TodoList);
