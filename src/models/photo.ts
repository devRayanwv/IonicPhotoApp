export class Photo {

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

}

export interface Photo {
  [prop: string]: any;
}
