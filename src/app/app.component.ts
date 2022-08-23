import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> ac15af8aaf74cf30c9450f5acda6854dec57680d

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
<<<<<<< HEAD
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }
=======
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moneymanager-app';
>>>>>>> ac15af8aaf74cf30c9450f5acda6854dec57680d
}
