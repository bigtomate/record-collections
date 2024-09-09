
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artist } from './artist-model';
import { Record } from './record-model';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store'
import { Observable, Subject } from 'rxjs';
import {State}  from '../records/store/record-list.reducer'

@Injectable({ providedIn: 'root' })
export class RecordService {
  private  artists: Artist[] = [];
  private  records: Record[] = [];
  recordList$!: Observable<State>;
  recordSelected = new Subject<Record>();
  recordsChanged = new Subject<Record[]>();
  constructor(
    private store: Store<{recordList: State}>) {
   this.recordList$ = store.select('recordList');
  }


  setRecords(records: Record[]) {
    this.records = records;
   }

  getAllArtists() {
  return this.artists.slice(); // return the copy of this ary
  }

  getAllRecords() {
 //   return this.records.slice(); // return the copy of this ary
 return this.recordList$.subscribe(records => console.log('records ' + records));
    }

    addRecordToRecordList(record : Record) {
     // this.store.dispatch(new RecordListActions.AddRecord(record));
    //  this.slService.addIngredients(ingredients);
    }

    getRecordById(id : number) : any {
      for (let i = 0; i < this.records.slice().length; i++) {
        if (id === this.records.slice()[i].id) {
            return this.records.slice()[i];
        }
      }
      return null;
    }

    addRecord(record:Record) {
    //console.log(this.recipes.slice().length );
    record.id = this.records.slice().length + 1;
    this.records.push(record);
    this.recordsChanged.next(this.records.slice());// otherwise the copy not got the update
    }

    updateRecord(id : number, newRecord: Record) {
      for (let i = 0; i < this.records.length; i++) {
        if (id === +this.records[i].id) {
          this.records[i] = newRecord;
        }
      }
    this.recordsChanged.next(this.records.slice());
    }

    deleteRecord(id : number) {
      for (let i = 0; i < this.records.slice().length; i++) {
        if (id === this.records.slice()[i].id) {
            this.records.splice(i, 1);
            break;
        }
      }
      this.recordsChanged.next(this.records.slice());
    }

}
