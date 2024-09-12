import { Component, OnInit } from '@angular/core';
import {Record, Records} from '../record-model'
import { Observable, Subject } from 'rxjs';

import {Router } from '@angular/router';
import {Store} from '@ngrx/store'
import {getRecords} from '../store/record-list.selector'
import { startEdit, updaterecord } from '../store/record-list.action';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.css'
})
export class RecordListComponent implements OnInit {

  recordList: Record[];
  records !: Records;
  editModel: boolean;
  recordList$!: Observable<Records>;

  constructor(
  private store: Store<{records: Records}>, private router:Router ) {
    this.recordList = [];
    this.editModel = false;
   }

  ngOnInit(): void {
   this.recordList$ =  this.store.select(getRecords);
   this.recordList$.subscribe(item =>
    {
      // workaround item isnt the "records" but a reducer?
      const state = {records: {recordList:[], errorMessage:'', editItemIndex : -1 , editItemId : -1} as Records};
      Object.assign(state, item);
      this.records = state.records;
    });
  }

  // dispatch make the state take new value on the editItemIndex
onEditItem(index : number) {
  this.editModel = true;
  this.store.dispatch(startEdit({index: index, id : -1}));
 }
}
