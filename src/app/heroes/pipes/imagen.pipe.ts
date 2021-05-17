import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  // pure: false // Solo cuando hay que cambiar si cambia la propiedad de un objeto, pero haría que se disparase muchas veces
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe):string {
    if( !heroe.id && !heroe.alt_img){
      return 'assets/no-image.png';
    }else if( heroe.alt_img ){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${ heroe.id }.jpg`;
    }
  }

}
