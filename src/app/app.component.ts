import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TopbarComponent, CommonModule],
  template: `
    <!-- TopBar -->
    <topbar *ngIf="showTopBar"></topbar>

    <!-- Navbar -->
    <app-navbar *ngIf="showChrome"></app-navbar>

    <!-- Content -->
    <main [class.with-nav]="showChrome" [class.with-topbar]="showTopBar">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
    }

    main.with-nav {
      padding-top: 80px;
    }

    main.with-topbar {
      padding-top: 80px;
    }
  `]
})
export class AppComponent {

  showChrome = true;
  showTopBar = false;

  // Pages totalement immersives (sans UI)
  private readonly FULLSCREEN_ROUTES = [
    '/welcome',
    '/selection',
    '/immersion',
    '/histoire-president'
  ];

  // Pages avec TopBar (navigation culturelle)
  private readonly TOPBAR_ROUTES = [
    '/histoire',
    '/a-propos',
    '/actualites',
    '/patrimoine',
    '/culturel',
    '/marche-art',
    '/touristique'
  ];

  constructor(private router: Router) {

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {

      const url = event.urlAfterRedirects;

      // Vérifie si page immersive
      const isFullscreen = this.FULLSCREEN_ROUTES.some(route =>
        url.startsWith(route)
      );

      // Vérifie si page avec TopBar
      const isTopbarRoute = this.TOPBAR_ROUTES.some(route =>
        url.startsWith(route)
      );

      // TopBar visible seulement si pas fullscreen
      this.showTopBar = isTopbarRoute && !isFullscreen;

      // Navbar visible seulement si page normale
      this.showChrome = !isFullscreen && !isTopbarRoute;
    });
  }
}