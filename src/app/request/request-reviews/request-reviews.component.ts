import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../system.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-reviews',
  templateUrl: './request-reviews.component.html',
  styleUrls: ['./request-reviews.component.css']
})
export class RequestReviewsComponent implements OnInit {

  tableHeadingStyle: string = "btn btn-link clickable";

  requests!: Request[];
  get isAdmin() { return this.systemsvc.isAdmin; }

  sortColumn: string = "status";
  sortOrderAsc: boolean = true;
  searchCriteria: string = "";

  constructor(
    private systemsvc: SystemService,
    private requestsvc: RequestService
  ) { }

  addUserUsername(requests: Request[]) {
    for(let r of requests) {
      r.user.username = r.user.username;
    }
  }

  ngOnInit(): void {
    this.systemsvc.chklogin();
    let userId = this.systemsvc.getUser()!.id;
    this.requestsvc.requests(userId).subscribe({
      next: (res) => {
        this.addUserUsername(res);
        console.debug(res);
        this.requests = res;
      },
      error: (err) => console.error(err)
    });
  }


}