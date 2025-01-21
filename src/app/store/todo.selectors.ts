import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodoState } from './todo.state';
import { TodoStatusFilter } from '../models/filter.type';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectSearchTerm = createSelector(
  selectTodoState,
  (state) => state.searchTerm
);

export const selectFilterTerm = createSelector(
  selectTodoState,
  (state) => state.filterTerm as TodoStatusFilter
);
