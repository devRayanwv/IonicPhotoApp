import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import {Photo} from "../../models/photo";

@Injectable()
export class Photos {

  constructor(public api: Api) { }

  getAll() {
    return this.api.get('/photos');
  }

  getComments(id: string) {
    return this.api.get('/posts/'+id+'/comments');
  }

  getPhoto(id: string) {
    return this.api.get('/photos/'+id);
  }
  add(photo: Photo) {
  }


}
