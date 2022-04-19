import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  user!: User | null;

  constructor(
    private router : Router
  ) { }

   get isLoggedIn() {
    return this.user != null;
  }

  chklogin() {
    if(!this.isLoggedIn) {
      this.router.navigateByUrl("/login");
    }
  }

  getUser(): User|null {
    return this.user; 
  }

  setUser(user: User) {
    this.user = user;
  }

  clear(): void {
    this.user = null;
  }

  get isAdmin() {
    if(this.user == null){
      return false;
    }
    return true;
  }
}
