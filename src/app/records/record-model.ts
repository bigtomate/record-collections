export class Record {
  [x: string]: any;

  constructor(public id: number, public name: string,
    public title:string, public description:string, public year: number, public artistname: string,
    public worth: string, public damage: string, public serial_nr: string, public cover_image: string) {
  }

}
