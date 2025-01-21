import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { TodoActions } from '../../../store/todo.actions';
import { TodoFormComponent } from '../../todo-form/todo-form.component';
import { TodoItemComponent } from '../../todo-item/todo-item.component';
import { TodoSignalsService } from '../../../services/todo-signals.service';
import { TodoStatsComponent } from '../../todo-stats/todo-stats.component';

/**
 * TodoContainerComponent is the main container for the Todo list application.
 */
@Component({
  selector: 'app-todo-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoFormComponent,
    TodoItemComponent,
    TodoStatsComponent,
  ],
  template: `
    <div class="max-w-2xl mx-auto mt-8">
      <h1 class="text-2xl font-bold mb-4">Todo List</h1>

      <app-todo-stats (filter)="onFilter($event)"></app-todo-stats>

      <input
        type="text"
        (input)="onSearch($event)"
        placeholder="Search todos..."
        class="w-full p-2 mb-4 border rounded"
      />

      <app-todo-form (addTodo)="onAddTodo($event)"></app-todo-form>

      <div class="mt-4">
        @for (todo of todoSignals.filteredTodos(); track todo.id) {
        <app-todo-item
          [todo]="todo"
          (toggleComplete)="onToggleComplete($event)"
          (remove)="onRemoveTodo($event)"
        ></app-todo-item>
        }
      </div>
    </div>
  `,
})
export class TodoContainerComponent implements OnInit {
  private store = inject(Store);
  todoSignals = inject(TodoSignalsService);

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  /**
   * onAddTodo method handles adding a new todo.
   * @param event - Contains the title and dueDate of the new todo to be added.
   */
  onAddTodo(event: { title: string; dueDate: Date }): void {
    this.store.dispatch(
      TodoActions.addTodo({ title: event.title, dueDate: event.dueDate })
    );
  }

  /**
   * onToggleComplete method toggles the completion status of a todo.
   * @param id - The ID of the todo to be toggled.
   */
  onToggleComplete(id: string): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  /**
   * onFilter method filter todos according to the selected stat.
   * @param filter - The ID of the todo to be toggled.
   */
  onFilter(filter: string): void {
    this.store.dispatch(TodoActions.filterTodos({ filterTerm: filter }));
  }

  /**
   * onRemoveTodo method removes a todo from the list.
   * @param id - The ID of the todo to be removed.
   */
  onRemoveTodo(id: string): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  /**
   * onSearch method filters the todos based on the search term entered.
   * @param event - The input event triggered when typing in the search field.
   */
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.dispatch(TodoActions.searchTodos({ searchTerm: target.value }));
  }
}
