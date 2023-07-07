import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  //Calculate rating to 1-5 stars
  prepareRating(rating: number) {
    return (rating * 5) / 100;
  }

  //Generate Id for artist
  generateId() {
    let date = new Date();
    let id = date.getTime();
    return id;
  }
}
