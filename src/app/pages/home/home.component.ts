import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  public searchQuery: string = '';
  public artists: any;
  isLoading: boolean = false;
  @ViewChild('input', { static: true })
  input!: ElementRef;
  constructor(
    private _spotifyService: SpotifyService,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((event) => {
          console.log(this.input.nativeElement.value);
          this.searchArtists(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  handleLoading() {
    this.isLoading = true;
  }

  searchArtists(val: string) {
    if (this.searchQuery.length > 0) {
      this._spotifyService.getAllArtists(val).subscribe((data) => {
        this.artists = data?.artists?.items;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      this.artists = []
      return;
    }
  }

  logoutAction() {
    localStorage.removeItem('spotify_token');
    this._router.navigate(['/login']);
  }
}
