import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HistoireComponent } from './pages/histoire/histoire.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { PatrimoineComponent } from './pages/patrimoine/patrimoine.component';
import { TourismeComponent } from './pages/tourisme/tourisme.component';
import { MarcheArtComponent } from './pages/marche-art/marche-art.component';
import { AProposComponent } from './pages/a-propos/a-propos.component';
import { HistoirePresidentComponent } from './pages/histoire-president/histoire-president.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { WelcomeScreenComponent } from './pages/welcom/welcome-screen.component';
import { UserSelectionComponent } from './pages/select_user/user-selection.component';
import { ImmersiveGatewayComponent } from './pages/imersion/immersive-gateway.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CultureEducationComponent } from './pages/culture_education/culture-education.component';

import { authGuard } from './guards/auth.guard';
import { immersionGuard } from './guards/immersion.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Auth
  { path: 'inscription',    component: InscriptionComponent,    canActivate: [noAuthGuard] },
  { path: 'signup',         component: SignupComponent,         canActivate: [noAuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },   // pas de guard = accessible via email

  // Immersion (une seule fois)
  { path: 'welcome',   component: WelcomeScreenComponent,    canActivate: [immersionGuard] },
  { path: 'selection', component: UserSelectionComponent,    canActivate: [immersionGuard] },
  { path: 'immersion', component: ImmersiveGatewayComponent, canActivate: [immersionGuard] },

  // Dashboard
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  // Pages
  { path: 'histoire',     component: HistoireComponent },
  { path: 'histoire/:id', component: HistoirePresidentComponent },
  { path: 'actualites',   component: ActualitesComponent },
  { path: 'patrimoine',   component: PatrimoineComponent },
  { path: 'tourisme',     component: TourismeComponent },
  { path: 'marche-art',   component: MarcheArtComponent },
  { path: 'culture-education', component: CultureEducationComponent },
  { path: 'a-propos',     component: AProposComponent },
  { path: 'paiement',     component: PaiementComponent },

  { path: '**', redirectTo: 'home' }
];
