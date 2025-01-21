import { Injectable, Signal, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  selectAllTodos,
  selectFilterTerm,
  selectSearchTerm,
} from '../store/todo.selectors';
import { Todo } from '../models/todo.model';
import { TodoStatusFilter } from '../models/filter.type';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Service that manages signals related to todos.
 */
@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  private todos!: Signal<Todo[]>;
  private searchTerm!: Signal<string>;
  private filterTerm!: Signal<TodoStatusFilter>;

  /**
   * Initializes the signals for todos and search term by converting the store selectors to signals.
   */
  private initializeSignals() {
    this.todos = toSignal(this.store.select(selectAllTodos), {
      initialValue: [] as Todo[],
    });
    this.searchTerm = toSignal(this.store.select(selectSearchTerm), {
      initialValue: '',
    });
    this.filterTerm = toSignal(this.store.select(selectFilterTerm), {
      initialValue: '',
    });
  }

  constructor(private store: Store) {
    this.initializeSignals();
  }

  /**
   * Computes the statistics of todos
   */
  todoStats = computed(() => {
    const todos = this.todos();
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      pending: todos.filter((t) => !t.completed).length,
      pastDue: todos.filter((t) => !t.completed && new Date() > t.dueDate)
        .length,
    };
  });

  /**
   * Computes the search/filter results based on the current search/filter term.
   */
  filteredTodos = computed(() => {
    const todos = this.todos();
    const searchTerm = this.searchTerm().toLowerCase();
    const filterTerm = this.filterTerm() as TodoStatusFilter;

    const filteredByStatus =
      filterTerm === '' ? todos : this.todosByStatus()[filterTerm] || todos;

    const searchResults = filteredByStatus.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(searchTerm)
    );

    return searchResults;
  });

  /**
   * Computes todos by their status: pending, past due, and completed.
   */
  todosByStatus = computed(() => {
    const todos = this.todos();
    return {
      pending: todos.filter((t) => !t.completed && new Date() <= t.dueDate),
      pastDue: todos.filter((t) => !t.completed && new Date() > t.dueDate),
      completed: todos.filter((t) => t.completed),
    };
  });

  /**
   * Checks if a todo is past due.
   */
  isPastDue(todo: Todo): boolean {
    return !todo.completed && new Date() > todo.dueDate;
  }

  /**
   * Checks if a todo is completed.
   */
  isComplete(todo: Todo): boolean {
    return todo.completed;
  }
}
