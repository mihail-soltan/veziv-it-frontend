import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veziv-it-frontend';
  isHamburgerOpen: boolean = false;
  user: string = 'Veziv IT';

  navItems: any[] = [
    { name: 'PORTFOLIO', link: '/works' },
    { name: 'MANAGE PORTFOLIO', link: '/manage' },
  ];
  constructor(private router: Router) {}
  
  onNavItemClick(item: string){
    this.isHamburgerOpen = false;
    this.router.navigate([item]);
  }
}
