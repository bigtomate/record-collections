import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import {Artist} from '../records/artist-model'
import {Record} from '../records/record-model'
import { RecordService } from "./reocrd-service";
@Injectable({providedIn : 'root'})
export class RecordRsolveService implements Resolve<Record[]> {

constructor(private dataStorageService : DataStorageService,
    private recordService : RecordService) {

}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const records = this.dataStorageService.fetchRecords();
       /*  if (artists.length === 0) {
          return  this.dataStorageService.fetchRecipes();
        } else {
           return recipes;
        } */
        return records;
    }
}
