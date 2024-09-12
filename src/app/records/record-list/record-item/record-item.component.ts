
import { Component, Input, OnInit} from '@angular/core';
import { Record } from '../../record-model';
@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrl: './record-item.component.css'
})
export class RecordItemComponent implements OnInit {
  @Input() record : Record | any;
  @Input()
  editModel!: boolean;

  constructor() {

   }

  ngOnInit(): void {

  }
}
