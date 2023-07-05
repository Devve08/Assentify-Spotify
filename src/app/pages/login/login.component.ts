import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  client_id = '61f543efb48f4e54b961ab93f8b06f2c';
  spotify_auth_endpoint = 'https://accounts.spotify.com/authorize';
  redirect = 'http://localhost:4200/home';

  loginToSpotify(url: any) {
    window.location = url;
  }

  login() {
    console.log('login')
    let url = `${this.spotify_auth_endpoint}?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect}&show_dialog=true`;
    this.loginToSpotify(url);
    console.log('url', url);
    // localStorage.removeItem('search');
  }

  ngOnInit(): void {}
}
