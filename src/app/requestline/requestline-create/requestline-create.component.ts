import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { SystemService } from 'src/app/system.service';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestlineCreateComponent implements OnInit {

  requestline: Requestline = new Requestline();
  products!: Product[];

  constructor(
    private requestlinesvc: RequestlineService,
    private router: Router,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private systemsvc: SystemService
  ) { }

  save(): void {
    this.requestlinesvc.create(this.requestline).subscribe({
      next: (res) => {
        console.debug("Requestline Added");
        this.router.navigateByUrl(`/request/lines/${this.requestline.requestID}`);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.requestline.requestID = +this.route.snapshot.params["rid"];
    this.productsvc.list().subscribe({
      next: (res) => {
        console.debug("Products:", res);
        this.products = res;
      },
      error: (err) => console.error(err)
    });
  }

}
