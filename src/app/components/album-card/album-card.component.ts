import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit {
@Input() image : any;
@Input() number_of_tracks : any;
@Input() release_year : any;
@Input() album_title : any;
@Input() link : any;

  constructor() { }

  ngOnInit(): void {
  }

}
