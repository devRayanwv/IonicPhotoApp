export class CommentModel {

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

}

export interface CommentModel {
  [prop: string]: any;
}
