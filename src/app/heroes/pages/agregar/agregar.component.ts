import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe:Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
};

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){ return;}

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHerosPorId(id)  )
    )
    .subscribe( heroe => this.heroe = heroe);
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( heroe => {
          this.mostrarSnackbar('Heroé actualizado');
        });
      }else{
        // Crear
        this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Heroé creado');
        });
      }

    }

    borrar(){

      const dialogRef = this.dialog.open(ConfirmarComponent, {
        minWidth: '30%',
        maxWidth: '90%',
        data: {...this.heroe} // para mandar un objeto nuevo, no la referencia del objeto heroe
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( heroe => {
            this.router.navigate(['/heroes/listado']);
            this.mostrarSnackbar('Heroé borrado');
          });
        }
      });


  }

  mostrarSnackbar(mensaje: string){
    this._snackBar.open(mensaje, 'X', {
      duration: 2500
    })
  }

}
