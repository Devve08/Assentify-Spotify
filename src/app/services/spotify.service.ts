import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  public config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('spotify_token')}`,
    },
  };
  constructor(private _httpClient: HttpClient) {}

  public getAllArtists(query: string): Observable<any> {
    const artists_endpoint = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
    return this._httpClient.get<any>(artists_endpoint, this.config);
  }

  getSingleArtist(id: any): Observable<any> {
    const albums_endpoint = `https://api.spotify.com/v1/artists/${id}/albums`;
    return this._httpClient.get<any>(albums_endpoint, this.config);
  }
}
