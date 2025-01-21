import { Todo } from '../models/todo.model';

export interface TodoState {
  todos: Todo[];
  searchTerm: string;
  loading: boolean;
  filterTerm: string;
}

export const initialState: TodoState = {
  todos: [],
  searchTerm: '',
  loading: false,
  filterTerm: '',
};
