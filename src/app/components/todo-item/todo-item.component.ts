import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { Todo } from '../../models/todo.model';
import { TodoSignalsService } from '../../services/todo-signals.service';

//Displays a single todo item in the list.
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule],
  template: `
    <div
      class="flex items-center p-4 border-b"
      [class.bg-red-50]="todoSignals.isPastDue(todo)"
      [class.bg-green-50]="todoSignals.isComplete(todo)"
    >
      <input
        type="checkbox"
        [checked]="todo.completed"
        (change)="toggleComplete.emit(todo.id)"
        class="mr-4"
      />
      <div class="flex-grow">
        <h3 [class.line-through]="todo.completed">{{ todo.title }}</h3>
        <p class="text-sm text-gray-600">
          Due: {{ todo.dueDate | date : 'medium' }}
        </p>
      </div>
      <button
        (click)="remove.emit(todo.id)"
        class="px-1 py-1 text-red-600 hover:bg-red-100 rounded"
      >
        <trash-outline-icon [size]="20" />
      </button>
      <button
        (click)="remove.emit(todo.id)"
        class="px-1 py-1 text-gray-600 hover:bg-gray-100 rounded"
      >
        <pencil-square-outline-icon [size]="20" />
      </button>
    </div>
  `,
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleComplete = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  todoSignals = inject(TodoSignalsService);
}
