import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}${this.todosLimit}`);
  }

  toggleCompleted(todo: Todo): Observable<Todo> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, this.httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo, this.httpOptions);
  }
}
