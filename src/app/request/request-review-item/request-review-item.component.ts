import { Component, OnInit } from '@angular/core';
import { Request } from '../request.class';
import { Requestline } from '../../requestline/requestline.class';
import { RequestService } from '../request.service';
import { SystemService } from 'src/app/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrls: ['./request-review-item.component.css']
})
export class RequestReviewItemComponent implements OnInit {

  request!: Request;
  showVerifyButton: boolean = false;

  get isAdmin() {
    if(!this.systemsvc.isLoggedIn){
      return false;
    }
    return this.systemsvc.getUser()?.isAdmin;
  }

  constructor(
    private systemsvc: SystemService,
    private requestsvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  review(): void {
    this.requestsvc.review(this.request).subscribe({
      next:(res) => {
        console.debug("Review:");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }

  edit(requestline: Requestline): void {
    this.router.navigateByUrl(`/requestline/edit/${requestline.id}`);
  }

  remove(requestline: Requestline): void {
    this.requestsvc.remove(requestline.id).subscribe({
      next: (res) => {
        console.debug("Requestline removed");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }

  approve(): void {
    this.requestsvc.approve(this.request).subscribe({
      next: (res) => {
        console.debug("Request approved.");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }

  reject(): void {
    this.showVerifyButton = !this.showVerifyButton;
  }

  verifyReject(): void {
    this.showVerifyButton = false;
    this.requestsvc.reject(this.request).subscribe({
      next: (res) => {
        console.debug("Request rejected.");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }

    refresh(): void {
      let id = this.route.snapshot.params["id"];
      this.requestsvc.get(id).subscribe({
        next: (res) => {
          console.debug("Request:", res);
          this.request = res;
        },
        error: (err) => console.error(err)
      });
    }

  ngOnInit(): void {
    this.refresh();
  }

}
