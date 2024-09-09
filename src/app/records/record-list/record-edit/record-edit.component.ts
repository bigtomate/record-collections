import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy ,Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Record } from '../../record-model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import * as RecordListActions from '../../store/record-list.action'
import {State}  from '../../store/record-list.reducer'
import { DataStorageService } from '../../../shared/data-storage.service';


@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrl: './record-edit.component.css'
})
export class RecordEditComponent implements OnInit, OnDestroy {

   @ViewChild('f') slForm : NgForm | undefined;
    editedItem!: Record;
    editedItemIndex!: number;
    subscription!: Subscription;
    @Input() editModel = false;
    records: Record[] | undefined;
    recordList$!: Observable<State>;
    constructor(private route: ActivatedRoute, private store: Store<{recordList: State}>,
     private dataStorageService: DataStorageService )
    {
      this.recordList$ = store.select('recordList');
      this.editedItemIndex = -1;
     }

    ngOnInit() {
      this.subscription = this.recordList$.subscribe(state => {
        if (state.records && state.records.length != 0) {
          this.records = state.records;
         } else {
           // load all records into the subscription initially
           this.subscription = this.dataStorageService.fetchRecords().subscribe(records => {
            this.records = state.records;
           } );
         }
      if (state.editedRecordAction) {
       this.editModel = true;
       this.editedItem = state.editedRecord;
       console.log('edit record with id' + this.editedItem.id);
       console.log('at index ' + state.editedRecordAction.payload);
       this.editedItemIndex = state.editedRecordAction.payload;
       this.slForm?.controls['name'].setValue(this.editedItem.name);

      this.slForm?.controls['title'].setValue(this.editedItem.title);
       this.slForm?.controls['description'].setValue(this.editedItem.description);
       this.slForm?.controls['year'].setValue(this.editedItem.year);
       this.slForm?.controls['artistname'].setValue(this.editedItem.artistname);
       this.slForm?.controls['worth'].setValue(this.editedItem.worth);
       this.slForm?.controls['damage'].setValue(this.editedItem.damage);
       this.slForm?.controls['serial_nr'].setValue(this.editedItem.serial_nr);
       this.slForm?.controls['cover_image'].setValue(this.editedItem.cover_image);
        }else {
          this.editModel = false;
        }
      })
    }

    ngOnDestroy () {
    // this.subscription.unsubscribe();
     // this.store.dispatch(new RecordListActions.StopEdit());
    }

    onSubmit(form : NgForm){
      const id =  this.editedItem?.id;
      const name = form.value.name == null? '' : form.value.name;
      const title = form.value.title == null? '' : form.value.title;
      const description = form.value.description == null? '' : form.value.description;
      const year = form.value.year == null? '' : form.value.year;
      const artistname = form.value.artistname == null? '' : form.value.artistname;
      const worth = form.value.worth == null? '' : form.value.worth;
      const damage = form.value.damage == null? '' : form.value.damage;
      const serial_nr = form.value.serial_nr == null? '' : form.value.serial_nr;
      const cover_image = form.value.cover_image == null? '' : form.value.cover_image;
      const newRecord = new Record(id,name, title, description, year, artistname, worth, damage, serial_nr, cover_image);
      if (this.editedItem?.id) {
        // after in backend the item has been changed then dispatch / update the store

       this.dataStorageService.updateRecord(newRecord).subscribe(suc => {
       this.store.dispatch(new RecordListActions.UpdateRecord(this.editedItemIndex, newRecord));
        console.log('success update');
        this.editedItemIndex == -1
       });

      } else if (this.editedItemIndex == -1) { // clear make the index to -1
        this.dataStorageService.addRecord(newRecord).subscribe(suc => {
          this.dataStorageService.fetchRecords().subscribe(records => {
            localStorage.setItem('recordList', JSON.stringify({records: records, editedRecord: null,
              editedRecordAction: RecordListActions.LoadRecord}));
            } );
          this.store.dispatch(new RecordListActions.AddRecord(-1, newRecord));
           console.log('success add');
          });
      }
      this.editModel = false;
      form.reset();
    }

    onClear() {
      this.slForm?.reset();
      this.editModel = false;
      this.editedItemIndex = -1;
      this.editedItem.id = 0;
      this.store.dispatch(new RecordListActions.StopEdit());
    }

    onDelete() {
   this.store.dispatch(new RecordListActions.DeleteRecord(this.editedItem?.id));
   this.onClear();
    }
  }
