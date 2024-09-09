import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Record } from "../records/record-model";
import { RecordService } from "../records/reocrd-service";
import {catchError, map, tap} from 'rxjs/operators'
import {environment} from '../../environments/environment'
import { Artist } from "../records/artist-model";
import { Observable } from "rxjs";
@Injectable({providedIn :'root'})// need httpService injected here, later
export class DataStorageService {
  errorMessage!: string;

 constructor(private http :HttpClient,
    private recordService :RecordService) {

 }

 fetchArtists() {
  return  this.http.get<Artist[]>(environment.artists)
    .pipe(map(artists => {
        return artists.map(artist => {
            return {... artist}
        });
    }), tap(artists => {
        console.log(artists);
    }))
 }

 fetchRecords() {
 return  this.http.get<Record[]>(environment.records)
   .pipe(map(records => {
       return records.map(record => {
           return {... record}
       });
   }), tap(records => {
       console.log(records);
       this.recordService.setRecords(records);
   }))
}

updateRecord(recordToUpdate: Record) : Observable<any>{
return this.http.put<Record[]>(environment.records + '/'+ recordToUpdate.id, recordToUpdate).pipe(
  map((response: any) => {
      return recordToUpdate
  })
);
}

addRecord(recordToAdd: Record) : Observable<any>{
  return this.http.post<Record[]>(environment.records, recordToAdd).pipe(
    map((response: any) => {
        return recordToAdd
    })
  );
  }
}
