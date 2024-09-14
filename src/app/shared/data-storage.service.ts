import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Record } from "../records/record-model";
import { map, tap} from 'rxjs/operators'
import {environment} from '../../environments/environment'
import { Artist } from "../records/artist-model";
import { Observable } from "rxjs";
@Injectable({providedIn :'root'})// need httpService injected here, later
export class DataStorageService {
  errorMessage!: string;
 constructor(private http :HttpClient) {

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

 fetchRecords() : Observable<Record[]>{
 return  this.http.get<Record[]>(environment.records);
}

updateRecord(recordToUpdate: Record) : Observable<Record>{
return this.http.put<Record[]>(environment.records + '/'+ recordToUpdate.id, recordToUpdate).pipe(
  map((resp: any) => {
      return recordToUpdate
  })
);
}

addRecord(recordToAdd: Record) : Observable<Record>{
  return this.http.post<Record[]>(environment.records, recordToAdd).pipe(
    map((resp: any) => {
        return recordToAdd
    })
  );
  }

  deleteRecord(recordToDelete: Record): Observable<any> {
    return this.http.delete<Record[]>(environment.records + '/delete/' + recordToDelete.id).pipe(
      map((resp: any) => {

      })
    );
    }
}
