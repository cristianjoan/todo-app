import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, tap } from 'rxjs/operators';

import { selectAllTodos } from './todo.selectors';
import { TodoActions } from './todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      map(() => {
        const savedTodos = localStorage.getItem('todos');
        const todos = savedTodos
          ? JSON.parse(savedTodos).map((todo: any) => ({
              ...todo,
              dueDate: new Date(todo.dueDate),
            }))
          : [];
        return TodoActions.loadTodosSuccess({ todos });
      })
    )
  );

  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TodoActions.addTodo,
          TodoActions.removeTodo,
          TodoActions.toggleTodo,
          TodoActions.loadTodosSuccess
        ),
        tap(() => {
          this.store
            .select(selectAllTodos)
            .pipe(
              tap((todos) => {
                localStorage.setItem('todos', JSON.stringify(todos));
              })
            )
            .subscribe();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
