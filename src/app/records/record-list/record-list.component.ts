import { Component, OnInit, Output } from '@angular/core';
import {Record, Records} from '../record-model'
import { Observable } from 'rxjs';

import {Router } from '@angular/router';
import {Store} from '@ngrx/store'
import {getRecords} from '../store/record-list.selector'
import { loadrecord, loadSearch, startEdit } from '../store/record-list.action';
import { FormControl } from '@angular/forms';

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
  searchQuery: string;
  searchSuggestion: string[];
  searchControl : FormControl;

  constructor(
  private store: Store<{records: Records}>, private router:Router ) {
    this.recordList = [];
    this.editModel = false;
    this.searchSuggestion = [];
    this.searchQuery = '';
    this.searchControl = new FormControl('');
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
    this.searchControl.valueChanges.subscribe(value => {
      if (!value) {
        this.onCleared();
      } else if (value !== this.searchQuery) { // so the search sugguestion reset
        this.onCleared();
      }
    });
  }

  // dispatch make the state take new value on the editItemIndex
onEditItem(index : number) {
  this.editModel = true;
  this.store.dispatch(startEdit({index: index, id : -1}));
 }

 updateQuery(event: Event) {
  const target = event.target as HTMLInputElement;
  const query = target.value;
  if (query.length > 3) {
    const artistNameAry = this.records.recordList.filter((r) =>
      r.artistname.toLowerCase().includes(query.toLowerCase())
    ).map(r => r.artistname.toLowerCase());
    this.searchSuggestion = Array.from(new Set(artistNameAry));
  } else {
    this.searchSuggestion = [];
  }
 }

 selectSuggestion(query: string) {
  this.searchQuery = query;
  this.searchSuggestion = [];
  this.searchControl.setValue(this.searchQuery);
  this.store.dispatch(loadSearch({searchQuery : this.searchQuery}));
 }

 onCleared() {
  this.store.dispatch(loadrecord());
 }
}
