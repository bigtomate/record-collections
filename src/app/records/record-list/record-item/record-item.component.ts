
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Record } from '../../record-model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrl: './record-item.component.css'
})
export class RecordItemComponent implements OnInit {
  @Input() record : Record | undefined;
  @Input()
  editModel!: boolean;

  constructor() {

   }

  ngOnInit(): void {

  }
}
