import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Movie } from "../models/Movie";
import { getString, remove } from "tns-core-modules/application-settings";


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
        const myToken = getString("mr-token");
        if(myToken){
            this.apiService.getMovies().subscribe(
                (data: Movie[]) => {
                    this.movies = data;
                },
                err => console.log(err)
            )
        } else {
            this.router.navigate(['/auth'])
        }
    }
    newMovie(){
        this.router.navigate(['/edit', -1])
    }
    logout(){
        remove("mr-token");
        this.router.navigate(['/auth'])
    }
}
