import { Component, OnInit } from '@angular/core';
import {Record} from '../record-model'
import { Observable, Subject } from 'rxjs';
import {RecordService} from '../reocrd-service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Store} from '@ngrx/store'
import {State}  from '../store/record-list.reducer'
import * as RecordListActions from '../store/record-list.action'
import {selectRecordList} from '../store/record-list.selector'
@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.css'
})
export class RecordListComponent implements OnInit {

  records: Record[] | undefined;
  subsription!: Subscription;
  fetchSubscription!: Subscription;
  recordList$!: Observable<State>;
  recordSelected = new Subject<Record>();
  recordsChanged = new Subject<Record[]>();
  editModel: boolean;

 constructor(private recordService : RecordService,
   private router: Router,
   private route : ActivatedRoute,
   private dataStorageService: DataStorageService,
   private store: Store<{recordList: State}> ) {
    this.recordList$ = store.select(selectRecordList);
    this.editModel = false;
   }

 ngOnInit() {
   this.subsription = this.recordList$
   .subscribe((state : State) => {
     if (state.records && state.records.length != 0) {
      this.records = state.records;
     } else {
       // load all records into the subscription initially, in case the delete records directly from db
       this.dataStorageService.fetchRecords().subscribe(records => {
        localStorage.setItem('recordList', JSON.stringify({records: records, editedRecord: null,
          editedRecordAction: RecordListActions.LoadRecord}));
        } );
        this.records = state.records;
     }
   });
   this.editModel = false;
 }

 ngOnDestroy (){
   this.subsription.unsubscribe();
   if (this.fetchSubscription) {
     this.fetchSubscription.unsubscribe();
   }
 }

onEditItem(index : number) {
  console.log('hier !!')
  this.editModel = true;
  this.store.dispatch(new RecordListActions.StartEdit(index));
 }
}
