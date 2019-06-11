import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {observable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Taskt } from '../models/task.interface';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Taskt>;
  private todos: Observable<Taskt[]>;
  constructor(db:AngularFirestore) { 
    this.todosCollection= db.collection<Taskt>('todos');
    this.todos=this.todosCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id= a.payload.doc.id;
          return { id, ...data};
        }

        );
      }
    ));
    
  }

  getTodos(){
    return this.todos;
  }
  getTodo(id:string){
return this.todosCollection.doc<Taskt>(id).valueChanges();
  }

  updateTodo(todo:Taskt, id: string){
    return this.todosCollection.doc<Taskt>(id).update(todo);
  }

  addTodo(todo:Taskt){
    return this.todosCollection.add(todo);
  }
  removeTodo(id:string){
    return this.todosCollection.doc(id).delete();
  }
}
