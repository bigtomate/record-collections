import {Record} from './record-model'
export class Artist {

  constructor(public id: number, public name: string, public recordList: Record[]) {

  }
}
