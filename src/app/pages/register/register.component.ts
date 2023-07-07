import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, createState, withProps } from '@ngneat/elf';
import { ArtistsRepository } from 'src/store/artists.repositry';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _artistRepo: ArtistsRepository
  ) {}
  artistForm!: FormGroup;
  selectedArtistImage: any;
  

  ngOnInit(): void {
    this.artistForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required, this.minAgeValidator(25)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
      profilePicture: ['', Validators.required],
      profileSource: [null],
      stageName: '',
      artistBackstory: '',
      startingDate: '',
      albums: this._fb.array([]),
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      let mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('This field can only accept images');
        return;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.selectedArtistImage = reader.result;
          this.artistForm.patchValue({
            profileSource: event.target.files[0],
          });
        };
      }
    } else {
      this.selectedArtistImage = null;
    }
  }

  onAlbumFileSelected(event: any, albumIndex: any) {
    if (event.target.files.length > 0) {
      let mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('This field can only accept images');
        return;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
       
          this.albumsControls.controls[albumIndex].patchValue({
            pictureSource: event.target.files[0],
            pictureName: reader.result,
          });
        };
      }
    } 
  }

  // Get albums array

  get albumsControls() {
    return <FormArray>this.artistForm.get('albums');
  }

  // Custom validator for minimum age
  minAgeValidator(minAge: number) {
    return (control: { value: string | number | Date }) => {
      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < minAge) {
        return { minAge: true };
      }
      return null;
    };
  }

  // Add album to albums array
  addAlbum() {
    const albumGroup = this._fb.group({
      picture: ['', Validators.required],
      pictureSource: [''],
      pictureName: [''],
      date: ['', Validators.required],
      songs: this._fb.array([]),
    });

    this.albumsControls.push(albumGroup);
  }

  // Remove album from albums array
  removeAlbum(index: number) {
    this.albumsControls.removeAt(index);
  }

  // Get songs from album
  get songs(): FormArray {
    return this.albumsControls.get('songs') as FormArray;
  }

  songsAtIndex(albumIndex: number) {
    return (this.albumsControls.at(albumIndex).get('songs') as FormArray)
      .controls;
  }

  // Add song to songs array of an album
  addSong(albumIndex: number) {
    const songGroup = this._fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
    });

    (this.albumsControls?.at(albumIndex)?.get('songs') as FormArray).push(
      songGroup
    );
  }

  // Remove song from songs array of an album
  removeSong(albumIndex: any, songIndex: any) {
    (this.albumsControls.at(albumIndex).get('songs') as FormArray).removeAt(
      songIndex
    );
  }

  // Log the registered artist model 
  saveArtist() {
    this._artistRepo.addArtist({
      ...this.artistForm.value,
      id: this.generateId(),
    });
    this._artistRepo.artists$.subscribe((artists) => console.log('Ngneat store',artists));
  }

  //Get date for ID
  generateId() {
    let date = new Date();
    let id = date.getTime();
    return id;
  }
}
