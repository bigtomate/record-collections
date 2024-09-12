import { Component, OnInit } from '@angular/core';
import {Record} from './record-model'
import { Observable, Subject } from 'rxjs';

import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Store} from '@ngrx/store'
import {RecordState}  from './store/record-list.reducer'
import * as RecordListActions from './store/record-list.action'
import {getRecords} from './store/record-list.selector'
import {AppStateModel} from '../shared/store/app/app.model'
import {Records} from '../records/record-model'

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}




