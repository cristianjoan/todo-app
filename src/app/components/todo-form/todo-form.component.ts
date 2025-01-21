import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//Displays a form to add new todos.
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="todoForm"
      (ngSubmit)="onSubmit()"
      class="p-4 bg-white rounded-lg shadow mb-4"
    >
      <div class="space-y-4">
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Title
          </label>
          <input
            id="title"
            type="text"
            formControlName="title"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task title..."
          />
          @if (todoForm.get('title')?.errors?.['required'] &&
          todoForm.get('title')?.touched) {
          <p class="mt-1 text-sm text-red-600">Title is required</p>
          }
        </div>

        <div>
          <label
            for="dueDate"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            formControlName="dueDate"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          @if (todoForm.get('dueDate')?.errors?.['required'] &&
          todoForm.get('dueDate')?.touched) {
          <p class="mt-1 text-sm text-red-600">Due date is required</p>
          }
        </div>

        <button
          type="submit"
          [disabled]="todoForm.invalid"
          class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </div>
    </form>
  `,
  providers: [FormBuilder],
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter<{ title: string; dueDate: Date }>();
  todoForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  /**
   * Initializes the form with default values and validation rules.
   */
  private initForm(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: [this.getDefaultDueDate(), Validators.required],
    });
  }

  /**
   * Provides the default due date, which is the next day.
   * @returns ISO string of the next day (in local datetime format).
   */
  private getDefaultDueDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 16);
  }

  /**
   * Handles form submission. Emits the addTodo event with the form data and resets the form.
   */
  onSubmit(): void {
    if (this.todoForm.valid) {
      this.addTodo.emit({
        title: this.todoForm.value.title,
        dueDate: new Date(this.todoForm.value.dueDate),
      });
      this.todoForm.reset({
        title: '',
        dueDate: this.getDefaultDueDate(),
      });
    }
  }
}
