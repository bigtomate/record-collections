import { inject, Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Record, Records } from "../records/record-model";
import { map, repeat, tap} from 'rxjs/operators'
import {environment} from '../../environments/environment'
import { Artist } from "../records/artist-model";
import { Firestore, collectionData, addDoc, collection, updateDoc, deleteDoc} from "@angular/fire/firestore";
import { getDocs, doc} from 'firebase/firestore'
import { FormSubmittedEvent } from "@angular/forms";
import { initializeApp } from 'firebase/app';

import { from, Observable, ReplaySubject } from "rxjs";


@Injectable({providedIn :'root'})

export class DataStorageFireStoreService {
  errorMessage!: string;
  item$: Observable<Record[]> | any;
  firestore: Firestore = inject(Firestore);
  recordCollection  = collection(this.firestore, 'records')

  constructor() {
  this.item$ = null;
 }

 fetchRecords() : Promise<any> {
  return getDocs(this.recordCollection);
 }

  updateRecord(recordToUpdate: Record) : Observable<any>{
    const document = doc(this.recordCollection, recordToUpdate.id);
    let recordToUpdateObj = this.getDocumentObject(recordToUpdate);
    const promise = updateDoc(document, recordToUpdateObj).then(() => {
      map((doc: { data: () => any; id: any }) => (
        // return the object
          recordToUpdate
       ));
    })
    return from(promise);
  }

  addRecord(recordToAdd: Record) : Observable<any> {
     const recordToAddObj = this.getDocumentObject(recordToAdd);
     const promise = addDoc(this.recordCollection, recordToAddObj).then(() => {
      map((doc: { data: () => any; id: any }) => (
        // return the object with id
        { ...recordToAdd, id: doc.id}
       ));
    })
    return from(promise);
   }

   deleteRecord(recordToDelete: Record) : Observable<any> {
      const document = doc(this.recordCollection, recordToDelete.id);
      const recordToDeleteObj = this.getDocumentObject(recordToDelete);
      const promise = deleteDoc(document).then(() => {
      console.log('delete record with id ' + recordToDelete.id);
     })
     return from(promise)
   }

   getDocumentObject (recordInput: Record) : any {
    const recordForActionObj = {
      artistname: recordInput.artistname,
      name: recordInput.name,
      description: recordInput.description,
      title: recordInput.title,
      year: recordInput.year,
      worth: recordInput.worth,
      damage: recordInput.damage,
      serial_nr: recordInput.serial_nr,
      cover_image: recordInput.cover_image,
      };
      return recordForActionObj;
   }
}



