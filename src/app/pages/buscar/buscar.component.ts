import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from "../../interfaces/cartelera-response";


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  movies : Movie[] = [];
  terminoBusqueda: string;

  constructor( private activatedRoute: ActivatedRoute,
               private PeliculasService: PeliculasService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.terminoBusqueda = params.texto
      //TODO llamar servicio
      this.PeliculasService.buscarPeliculas(params.texto).subscribe( movies => {
        this.movies = movies
      } )
    } )

  }

}
