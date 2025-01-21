import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Todo } from '../models/todo.model';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Add Todo': props<{ title: string; dueDate: Date }>(),
    'Remove Todo': props<{ id: string }>(),
    'Toggle Todo': props<{ id: string }>(),
    'Search Todos': props<{ searchTerm: string }>(),
    'Filter Todos': props<{ filterTerm: string }>(),
  },
});
