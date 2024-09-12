import { Component } from '@angular/core';
import {Store} from '@ngrx/store'
import { loadrecord } from './records/store/record-list.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'record-collections';
  constructor(private store : Store) {
    this.store.dispatch(loadrecord());
  }
}



