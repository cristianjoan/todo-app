import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { TodoEffects } from './store/todo.effects';
import { todoReducer } from './store/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
  ],
};
