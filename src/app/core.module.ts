import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecordService } from './records/reocrd-service';


@NgModule({
  providers: [
    RecordService
  ]
})
export class CoreModule {}
