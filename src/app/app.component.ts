import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoContainerComponent } from './components/containers/todo-container/todo-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoContainerComponent],
  template: `
    <div class="max-w-2xl mx-auto mt-8">
      <app-todo-container></app-todo-container>
    </div>
  `,
})
export class AppComponent {}
