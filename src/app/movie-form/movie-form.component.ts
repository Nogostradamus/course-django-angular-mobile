import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Movie } from "../models/Movie";
``
@Component({
  selector: 'ns-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  moduleId: module.id,
})
export class MovieFormComponent implements OnInit {
  movie: Movie;
  movieTitle: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    if (id >= 0){
       this.getDetails(id);
    } else {
      this.movie = {title: "", description: ''};
    }
  }
  getDetails(id: number){
    this.apiService.getMovie(id).subscribe(
        (data: Movie) => {
            this.movie = data;
            this.movieTitle = this.movie.title;
        },
        err => console.log(err)
    )
  }
  saveForm(){
    if(this.movie.id){
      this.apiService.updateMovie(this.movie.id, this.movie.title,
      this.movie.description).subscribe(
        result => this.router.navigate(['/items']),
        err => console.log(err)
      )
    } else {
      this.apiService.createMovie(this.movie.title,
        this.movie.description).subscribe(
          result => this.router.navigate(['/items']),
          err => console.log(err)
        )
    }
    
  }
  editClicked(){
    //this.router.navigate(['/edit', this.movie.id])
  }
  goBack(){
     // this.routerExtension.backToPreviousPage();
  }
  removeMovie(){
    this.apiService.deleteMovie(this.movie.id).subscribe(
      result => this.router.navigate(['/items']),
      err => console.log(err)
    )
  }

}
