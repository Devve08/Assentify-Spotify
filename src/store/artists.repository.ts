import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import {
  selectAllEntities,
  addEntities,
  withEntities,
  setEntities,
} from '@ngneat/elf-entities';

export interface Artist {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: number;
  profilePicture: string;
  stageName: string;
  profileSource: any;
  artistBackstory: string;
  startingDate: string;
  albums: any[];
}

const { state, config } = createState(withEntities<Artist>());

const artistsStore = new Store({ name: 'artists', state, config });

@Injectable({ providedIn: 'root' })
export class ArtistsRepository {
  artists$ = artistsStore.pipe(selectAllEntities());

  setArtists(artists: Artist[]) {
    artistsStore.update(setEntities(artists));
  }

  addArtist(artist: Artist) {
    console.log('repo', artist)
    artistsStore.update(addEntities(artist));
  }
}
