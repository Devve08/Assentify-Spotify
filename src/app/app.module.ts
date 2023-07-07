import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyService } from './services/spotify.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';
import { HomeComponent } from './pages/home/home.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LoginComponent,
    HomeComponent,
    ArtistCardComponent,
    AlbumsComponent,
    AlbumCardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [SpotifyService, AuthGuardServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
