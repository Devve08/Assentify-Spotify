import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {}
}
