import { Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';

export const routes: Routes = [
  { path: '', redirectTo: '/records', pathMatch: 'full' },
  { path:'records', component : RecordsComponent},
  // {path:'records/new', loadChildren: () => import('./records/record-list/record-list.module').then(m => m.RecordListModule)},
];
