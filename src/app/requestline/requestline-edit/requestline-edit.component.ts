import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestlineEditComponent implements OnInit {

  requestline!: Requestline;
  products!: Product[];
  pageTitle: string = "Requestline Change";

  constructor(
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    this.requestline.productID = +this.requestline.productID;
    this.requestlinesvc.change(this.requestline).subscribe({
      next: (res) => {
        console.debug("Requestline added");
        this.router.navigateByUrl(`/request/lines/${this.requestline.requestID}`);
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.productsvc.list().subscribe({
      next: (res) => {
        console.debug("Products:", res);
        this.products = res;
      },
      error: (err) => console.error(err)
    });
    let id = +this.route.snapshot.params["id"];
    this.requestlinesvc.get(id).subscribe({
      next: (res) => {
        console.debug("Requestline:", res);
        this.requestline = res;
      },
      error: (err) => console.error(err)
    });
  }

}