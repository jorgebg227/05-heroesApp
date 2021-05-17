import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;
  private _auth: Auth | undefined;

  get auth(){
    return {...this._auth}
  }

  constructor( private http: HttpClient ) { }

  verificaAutentificacion(): Observable<boolean>{

    if(!localStorage.getItem('token')){
      return of(false); // of() para devolver un Observable
    }

    return this.http.get<Auth>(`${this.apiUrl}/usuarios/1`)
            .pipe(
              map( auth =>{
                this._auth = auth;
                return true;
              })
            );
  }

  login(){
    return this.http.get<Auth>(`${this.apiUrl}/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth),
              tap( auth => localStorage.setItem('token', auth.id)),
            );
  }
}
