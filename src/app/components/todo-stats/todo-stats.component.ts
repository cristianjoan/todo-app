import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';

import { TodoSignalsService } from '../../services/todo-signals.service';
import { TodoStatusFilter } from '../../models/filter.type';

//Displays the different todos stats
@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-4 gap-4 mb-6">
      <button class="p-4 bg-blue-100 rounded " (click)="filter.emit('')">
        <h3 class="font-bold">Total</h3>
        <p class="text-2xl">{{ todoSignals.todoStats().total }}</p>
      </button>
      <button
        class="p-4 bg-yellow-100 rounded"
        (click)="filter.emit('pending')"
      >
        <h3 class="font-bold">Pending</h3>
        <p class="text-2xl">{{ todoSignals.todoStats().pending }}</p>
      </button>
      <button class="p-4 bg-red-100 rounded" (click)="filter.emit('pastDue')">
        <h3 class="font-bold">Past Due</h3>
        <p class="text-2xl">{{ todoSignals.todoStats().pastDue }}</p>
      </button>
      <button
        class="p-4 bg-green-100 rounded"
        (click)="filter.emit('completed')"
      >
        <h3 class="font-bold">Completed</h3>
        <p class="text-2xl">{{ todoSignals.todoStats().completed }}</p>
      </button>
    </div>
  `,
})
export class TodoStatsComponent {
  @Output() filter = new EventEmitter<TodoStatusFilter>();
  todoSignals = inject(TodoSignalsService);
}
