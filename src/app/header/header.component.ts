import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Records } from '../records/record-model';
import { addrecord } from '../records/store/record-list.action';
import {recordList} from '../../environments/init';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  constructor(
  private store: Store<{records: Records}>, private router:Router ) {

   }

onFetchData() {
  recordList.forEach( (record: any) => {
     this.store.dispatch(addrecord({recordInput: record}))
    });
}
}
