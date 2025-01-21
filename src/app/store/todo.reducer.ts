import { createReducer, on } from '@ngrx/store';

import { initialState } from './todo.state';
import { TodoActions } from './todo.actions';

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),
  on(TodoActions.addTodo, (state, { title, dueDate }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: crypto.randomUUID(),
        title,
        dueDate,
        completed: false,
      },
    ],
  })),
  on(TodoActions.removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  on(TodoActions.searchTodos, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(TodoActions.filterTodos, (state, { filterTerm }) => ({
    ...state,
    filterTerm,
  }))
);
