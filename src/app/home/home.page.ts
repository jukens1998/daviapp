    
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  todos=[];

  constructor(private todoService: TodoService){}
  
  ngOnInit(){
    this.todoService.getTodos().subscribe((todos) =>{
      this.todos = todos;
    })
  }
  onRemove(idTask:string){
    this.todoService.removeTodo(idTask);
  }
 
}


