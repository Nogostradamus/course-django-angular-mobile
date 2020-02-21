import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Movie } from "../models/Movie";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    movie: Movie;
    highlight: number;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private routerExtension: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.highlight = 0;
        const id = +this.route.snapshot.params.id;
        this.getDetails(id);
    }
    setHightlight(rate: number) {
        this.highlight = rate;
    }
    rateClicked(){
        this.apiService.rateMovie(this.highlight, this.movie.id).subscribe(
            result => this.getDetails(this.movie.id),
            err => console.log(err)
        )
    }
    getDetails(id: number){
        this.apiService.getMovie(id).subscribe(
            (data: Movie) => {
                this.movie = data;
            },
            err => console.log(err)
        )
    }
    editClicked(){
        this.router.navigate(['/edit', this.movie.id])
    }
    goBack(){
        this.routerExtension.backToPreviousPage();
    }
}
