import { Component, OnInit, ViewChild, OnDestroy ,Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Record, Records } from '../../record-model';
import { ActivatedRoute } from '@angular/router';
import { getRecords } from '../../store/record-list.selector';
import { addrecord, deleterecord, updaterecord } from '../../store/record-list.action';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrl: './record-edit.component.css'
})
export class RecordEditComponent implements OnInit, OnDestroy {

    @ViewChild('f') slForm : NgForm | undefined;
    editedItem: Record | any;
    editedItemIndex: number;
    @Input() editModel = false;
    records: Record[] | undefined;

    editRecordId: any
    constructor(private route: ActivatedRoute, private store: Store) {
     this.editedItemIndex = -1;
    }

    ngOnInit() {
      this.store.select(getRecords).subscribe(item => {
      // workaround item isnt the "records" but a reducer?
      const state = {records: {recordList:[], errorMessage:'', editItemIndex : -1 , editItemId: -1} as Records};
      Object.assign(state, item);
      const itemIdx = state?.records?.editItemIndex;
      if (itemIdx != -1 && itemIdx) {
        this.editedItem = state?.records?.recordList[itemIdx];
        if (this.editedItem) {
          this.editModel = true;
          console.log('edit record with id ' + this.editedItem.id);
          console.log('at index ' +  itemIdx);
          this.editedItemIndex = itemIdx;
          this.slForm?.controls['name'].setValue(this.editedItem.name);
          this.slForm?.controls['title'].setValue(this.editedItem.title);
          this.slForm?.controls['description'].setValue(this.editedItem.description);
          this.slForm?.controls['year'].setValue(this.editedItem.year);
          this.slForm?.controls['artistname'].setValue(this.editedItem.artistname);
          this.slForm?.controls['worth'].setValue(this.editedItem.worth);
          this.slForm?.controls['damage'].setValue(this.editedItem.damage);
          this.slForm?.controls['serial_nr'].setValue(this.editedItem.serial_nr);
          this.slForm?.controls['cover_image'].setValue(this.editedItem.cover_image);
           } else {
             this.editModel = false;
           }
      }
      });
    }

    ngOnDestroy () {
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
      const recordResult = new Record(id,name, title, description, year, artistname, worth, damage, serial_nr, cover_image);
      if (this.editedItem?.id) {
        // after in backend the item has been changed then dispatch / update the store
        this.store.dispatch(updaterecord({recordInput: recordResult}))
      } else if (this.editedItemIndex == -1) { // clear make the index to -1
        this.store.dispatch(addrecord({recordInput: recordResult}))
      }
      this.editModel = false;
      form.reset();
    }

    onClear() {
      this.slForm?.reset();
      this.editModel = false;
    //  this.store.dispatch(new RecordListActions.StopEdit());
    }

    onDelete() {
    this.store.dispatch(deleterecord({recordInput: this.editedItem}));
    this.onClear();
    }
  }
