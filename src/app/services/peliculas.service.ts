import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarteleragResponse, Movie } from '../interfaces/cartelera-response';

import { catchError, map, tap } from "rxjs/operators";
import { MovieDetails } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3'
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http : HttpClient ) { }

  get params(){
    return {
      api_key: '75ed7910e7731b19d166ec380a973037',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<CarteleragResponse>{

    if( this.cargando ){
      return
    }

    this.cargando = true;
    return this.http.get<CarteleragResponse>(`${ this.baseUrl }/movie/now_playing`,{
      params : this.params
    }).pipe(
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false
      } )
    )

  }

  resetCarteleraPage(){
    this.carteleraPage = 1
  }

  buscarPeliculas( texto : string ):Observable<Movie[]>{

    // const params = {...this.params, page: '1', query: texto }

    // return this.http.get<CarteleragResponse>(`${ this.baseUrl }/search/movie/`,{
    //   params: this.params
    // }).pipe(
    //   map( resp =>  resp.results  )
    // )

    return this.http.get<CarteleragResponse>(`${this.baseUrl}/search/movie?api_key=75ed7910e7731b19d166ec380a973037&language=es-ES&query=${texto}&page=1&include_adult=true`).pipe(
      map( resp => resp.results )
    )

  }

  getPeliculaInfo( id : string ){
    return this.http.get<MovieDetails>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    })
  }

  getCasting( id : string ){
    return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    })
  }

}
 