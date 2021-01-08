import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies : Movie[] = [];
  movieSlideShow : Movie[] = [];


  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos = document.documentElement.scrollTop + 1000
    const max =  document.documentElement.scrollHeight
    
    if( pos > max ){
      // console.log('llamar servicio');
      if( this.peliculasService.cargando  ){ return }

      this.peliculasService.getCartelera().subscribe( resp => {
        this.movies.push(...resp.results)
      })
    }
    
  }

  constructor( private peliculasService : PeliculasService ) { 
  
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera()
            .subscribe( resp => {
              // console.log(resp.results);
              this.movies = resp.results
              this.movieSlideShow = resp.results
            })
    
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage()
  }

}
