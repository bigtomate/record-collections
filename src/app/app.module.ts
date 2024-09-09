import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component'
import { HeaderComponent } from './header/header.component';
import { RecordService } from './records/reocrd-service';
import { RecordListComponent } from './records/record-list/record-list.component';
import { RecordItemComponent } from './records/record-list/record-item/record-item.component';
import {HttpClientModule} from '@angular/common/http';
import { CoreModule } from './core.module';

import { ReactiveFormsModule } from '@angular/forms';
import {provideStore, StoreModule} from '@ngrx/store'
import {recordListReducer1} from './records/store/record-list.reducer'
import { RecordEditComponent } from './records/record-list/record-edit/record-edit.component';
import { RecordListModule } from './records/record-list/record-list.module';
import {EffectsModule, provideEffects} from '@ngrx/effects'
import {RecordListEffects} from './records/store/record-list.effects';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecordsComponent,
    RecordListComponent,
    RecordItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
    BrowserModule,
    // FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     AppRoutingModule,
     StoreModule.forRoot({recordList: recordListReducer1}),
//EffectsModule.forRoot([RecordListEffects]),
RecordListModule
  ],
  bootstrap: [AppComponent],
  providers:[RecordService]
 // providers:[RecordService, provideStore({recordList: recordListReducer1}), provideEffects()]
})
export class AppModule { }
