import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardServiceService {

  constructor(private _router: Router){

  }
  canActivate(): boolean {
    if (localStorage.getItem('spotify_token')) {
      return true;
    }
    this._router.navigateByUrl('/')
    return false;
  }
}
