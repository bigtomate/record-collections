export class Record {
  constructor(public id: number, public name: string,
    public title:string, public description:string, public year: number, public artistname: string,
    public worth: string, public damage: string, public serial_nr: string, public cover_image: string) {
  }
}

export class Records { // state
  constructor(public recordList: Record[], public errorMessage: string, public editItemIndex: number, public editItemId: number) {
  }
}

