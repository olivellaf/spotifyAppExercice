import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer QCxU4B_QdmkS0xTDQSpSY5brH-qBw2Z0kXN9n-YNDp2ZUF-D9Ac5t7dIuTPOfmKLL5F27UuRvk57vBUiyg'
    });

    return this.http.get(url, { headers});
  }


  constructor( private http:HttpClient ) {
    console.log('Spotify service ready!');
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( data => data['albums'].items ));
  }

  getArtists( term:string ) {
    return this.getQuery(`search?q=${ term }&type=artist&limit=15`)
      .pipe( map( data => data['artists'].items ));
  }

  getArtist( id:string ) {
    return this.getQuery(`artists/${ id }`)
      //.pipe( map( data => data['artists'].items ));
  }

  getTopTracksFromArtist( id:string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=es`)
      .pipe( map( data => data['tracks'] )); // para no obtener data.tracks --> aplicamos pipe para obtener directamente los 10 tracks
  }
}

// If we could limit the results to 5, add at the end of the url '?limit=5'
//return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
//  .pipe(map( data => data['albums'].items ));

// If we could limit the results to 5, add at the end of the url '?limit=5'
//return this.http.get(`https://api.spotify.com/v1/search?q=${ term }&type=artist&limit=15`, { headers })
// short version. When have an arrow function with only return line.
//.pipe( map( data => data['artists'].items ));
