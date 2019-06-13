import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {observable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection;
  private todos: Observable<any[]>;
  constructor(db:AngularFirestore) { 
    this.todosCollection= db.collection<any>('todos');
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
return this.todosCollection.doc<any>(id).valueChanges();
  }

  updateTodo(todo, id: string){
    return this.todosCollection.doc<any>(id).update(todo);
  }

  addTodo(todo){
    return this.todosCollection.add(todo);
  }
  removeTodo(id:string){
    return this.todosCollection.doc(id).delete();
  }
}
