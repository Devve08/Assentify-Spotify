import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  public artistId: any = '' ;
  public artistAlbums : any

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.artistId = params.get('id');
    });

    this._spotifyService.getSingleArtist(this.artistId).subscribe((data)=>{
      console.log(data);
      this.artistAlbums = data?.items
    })
  }
}
