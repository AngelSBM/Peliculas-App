import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;
  public cast: Cast[] = [];

  constructor( private activatedRoute : ActivatedRoute,
               private peliculasService : PeliculasService,
               private location : Location ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([

      this.peliculasService.getPeliculaInfo( id ),
      this.peliculasService.getCasting( id )

    ]).subscribe( ( [pelicula, cast] ) => {
      this.pelicula = pelicula;
      this.cast     = cast.cast
    } );

    //  this.peliculasService.getPeliculaInfo( id ).subscribe( movie => {
    //    this.pelicula = movie;     
    //  } );


    //  this.peliculasService.getCasting( id ).subscribe( cast => {
    //    console.log(cast);
    //    this.cast = cast.cast
    //  } )
     
  }

  onRegresar(){
    this.location.back()
  }

}
