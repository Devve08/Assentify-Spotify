import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css'],
})
export class ArtistCardComponent implements OnInit {
  @Input() image: any;
  @Input() followers: number = 0;
  @Input() name: string = '';
  @Input() rating: number = 0;
  @Input() id: string = '';
  starsRating: any;

  constructor(private _helpers: HelpersService) {}

  ngOnInit(): void {
    this.starsRating = Array(
      Math.floor(this._helpers.prepareRating(this.rating))
    ).map((x, i) => i);
  }

  //Check if rating is an integer to use the half star
  isInteger(number: number): boolean {
    return this._helpers.prepareRating(number) % 1 === 0 ?? false;
  }
}
