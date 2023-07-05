import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'assentify-task';

  getReturnedParams(params: any) {
    if (!params) {
      return;
    } else {
      const string = params.substring('1');
      const paramsSplit = string.split('&');
      const paramsObject = paramsSplit.reduce((acc: any, value: any) => {
        const [key, v] = value.split('=');
        acc[key] = v;
        return acc;
      }, {});
      return paramsObject;
    }
  }
  ngOnInit(): void {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = this.getReturnedParams(
        window.location.hash
      );
      localStorage.setItem('spotify_token', access_token);
    }
  }
}
