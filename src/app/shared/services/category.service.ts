import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories;

  constructor(private db: AngularFirestore) {
    
   }

   getAll(){
    // return this.db.collection('/categories', ref => ref.orderBy('name'));  
    return this.db.collection('/categories/', ref => ref.orderBy('name')).snapshotChanges().pipe(map
      (actions => actions.map(a => {
        const data = a.payload.doc.data(name)
        const id = a.payload.doc.id;
        const result = {id, ...data};
        // console.log(result)
        return result;
      })))
   }

}
