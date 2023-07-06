import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}
  artistForm!: FormGroup;

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
      stageName: '',
      artistBackstory: '',
      startingDate: '',
      albums: this._fb.array([]),
    });
  }

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
      date: ['', Validators.required],
      songs: this._fb.array([]),
    });

    this.albumsControls.push(albumGroup);
  }

  // Remove album from albums array
  removeAlbum(index: number) {
    this.albumsControls.removeAt(index);
  }

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
    console.log(this.artistForm.value);
  }
}
