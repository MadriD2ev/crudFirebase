import { Injectable } from '@angular/core';

//trabajar con colleciones en firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//interface es una clase que nos permite designar un objeto que siempre tenga las mismas caracteristicas
export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  //Eliminar
  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {  

    this.itemsCollection = afs.collection<Item>('items');
    //this.items = this.itemsCollection.valueChanges();
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item; //Item nombre de mi interface, la data que es toda la información o coleccion de datos
        const id = a.payload.doc.id; //además de traernos el id 
        return { id, ...data };
      }))
    );
  }

  listaItem(){ 
    return this.items; 
  } 

  agregarItem(item: Item) {
    this.itemsCollection.add(item);
  }

  eliminarItem(item) {
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.delete();
  }

  editarItem(item) {
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.update(item);
  }

}
