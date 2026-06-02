import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

// Imports des composants
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TopbarComponent, CommonModule],
  template: `
    <!-- TopBar affichée uniquement sur les pages d'histoire, culture, etc. -->
    <topbar *ngIf="showTopBar"></topbar>
    
    <app-navbar *ngIf="showChrome"></app-navbar>
    
    <main [class.with-nav]="showChrome" [class.with-topbar]="showTopBar">
      <router-outlet></router-outlet>
    </main>
    
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    main { flex: 1; }
    main.with-nav { padding-top: 80px; }
    main.with-topbar { padding-top: 80px; }
  `]
})
export class AppComponent {
  showChrome = true;
  showTopBar = false;

  // Pages sans rien (immersion)
  private readonly FULLSCREEN_ROUTES = ['/welcome', '/selection', '/immersion', '/histoire/'];

  // Pages AVEC la TopBar (selon tes dossiers dans Capture d'écran 2026-05-01 175359.png)
  private readonly TOPBAR_ROUTES = [
    '/histoire', 
    '/a-propos', 
    '/actualites', 
    '/patrimoine', 
    '/culturel', 
    '/marche-art',
    '/touristique', 
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
  filter(e => e instanceof NavigationEnd)
).subscribe((e: any) => {
  const url = e.urlAfterRedirects;

  // 1. On définit d'abord si on est en mode plein écran (ex: immersion, histoire-president)
  const isFullscreen = this.FULLSCREEN_ROUTES.some(r => url.startsWith(r));

  // 2. La TopBar ne s'affiche que si on est sur une route autorisée ET qu'on n'est PAS en plein écran
  const isTopbarRoute = this.TOPBAR_ROUTES.some(r => url.startsWith(r));
  this.showTopBar = isTopbarRoute && !isFullscreen;

  // 3. La Navbar et le Footer ne s'affichent que si on n'est PAS en plein écran ET pas sur une page avec TopBar
  this.showChrome = !isFullscreen && !isTopbarRoute;
});}
}