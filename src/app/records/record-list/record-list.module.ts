import { NgModule } from "@angular/core";
import {RecordListComponent} from '../record-list/record-list.component';
import {RecordEditComponent} from '../record-list/record-edit/record-edit.component';

import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {AppRoutingModule} from '../../app-routing.module';
@NgModule({
    declarations:[ RecordEditComponent],
    exports:[ RecordEditComponent, RouterModule],
    imports:[
        CommonModule, //ngfor ngIf
        ReactiveFormsModule,
        RouterModule.forChild(
         [
            {
                path: '', component: RecordEditComponent
               }
          ]),
        FormsModule],
})
export class RecordListModule {

}
