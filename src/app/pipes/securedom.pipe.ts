import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Pipe({
  name: 'securedom'
})
export class SecuredomPipe implements PipeTransform {

  constructor( private domSanitizer:DomSanitizer ){ }

  transform(value: string): any {
    const url = 'https://open.spotify.com/embed?uri=';
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
