import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from "@angular/router";

import { SpotifyService }  from "../services/../../services/spotify.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {

  artist: any = {};
  topTracks: any = {};
  loadingArtist: boolean;

  constructor(private actRouter: ActivatedRoute, private spfys: SpotifyService) {
    this.loadingArtist = true;

    this.actRouter.params.subscribe( params => {
      this.getArtist( params['id'] );
      this.getTopTracksFromArtist( params['id'] );
    });
  }

  getArtist( id:string ) {
    this.loadingArtist = true;

    this.spfys.getArtist( id )
      .subscribe( artist => {
        this.artist = artist;
        
        this.loadingArtist = false;
      });
  }

  getTopTracksFromArtist (id: string) {

    this.spfys.getTopTracksFromArtist( id )
      .subscribe( topTracks => {
        this.topTracks = topTracks;
        console.log(this.topTracks);
      });
  }

}
