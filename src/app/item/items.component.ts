import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Movie } from "../models/Movie";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    movies: Array<Movie>;

    constructor(
        private apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.apiService.getMovies().subscribe(
            (data: Movie[]) => {
                this.movies = data;
            },
            err => console.log(err)
        )
    }
    newMovie(){
        this.router.navigate(['/edit', -1])
    }
}
