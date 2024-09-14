import { importProvidersFrom, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component'
import { HeaderComponent } from './header/header.component';

import { RecordListComponent } from './records/record-list/record-list.component';
import { RecordItemComponent } from './records/record-list/record-item/record-item.component';
import {HttpClientModule} from '@angular/common/http';


import { ReactiveFormsModule } from '@angular/forms';
import {provideState, provideStore, StoreModule} from '@ngrx/store'
//import {recordListReducer1} from './records/store/record-list.reducer'
import { RecordEditComponent } from './records/record-list/record-edit/record-edit.component';
import { RecordListModule } from './records/record-list/record-list.module';
import {EffectsModule, provideEffects} from '@ngrx/effects'
import {RecordListEffects} from './records/store/record-list.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { recordReducer } from './records/store/record-list.reducer';
import {AngularFireModule} from '@angular/fire/compat'

import { environment } from 'src/environments/environment';


import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {FirestoreModule} from '@angular/fire/firestore'
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
    HttpClientModule,
    BrowserModule,
    // FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     AppRoutingModule,
     StoreModule.forRoot(),
     StoreModule.forFeature('record', { records : recordReducer }),
     StoreDevtoolsModule.instrument({ maxAge: false, logOnly: !isDevMode() }),
     //StoreModule.forRoot({recordList: recordListReducer1}),
EffectsModule.forRoot([RecordListEffects]),
RecordListModule,
AngularFireModule.initializeApp(environment.firebase),
FirestoreModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
 // providers:[RecordService, provideState({ name: 'record', reducer: recordReducer }), provideEffects()]
})
export class AppModule { }
