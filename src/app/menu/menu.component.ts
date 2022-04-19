import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { Menu } from './menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: Menu[] = [
    new Menu("Login", "/user/login"),
    new Menu("Home", "/home"),
    new Menu("Product", "/product/list"),
    new Menu("User", "/user/list"),
    new Menu("Vendor", "/vendor/list"),
    new Menu("Request", "/request/list"),
    new Menu("About", "/about"),
    new Menu("Reviews", "/request/reviews")
  ]


  constructor(
    private systemsvc: SystemService
  ) { }

  ngOnInit(): void {
  }

}
