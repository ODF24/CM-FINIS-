import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Guard: l'immersion n'est accessible qu'une seule fois
// Si déjà vue → redirection vers /home
// Si pas connecté → redirection vers /signup
export const immersionGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  if (!supabase.isLoggedIn) {
    router.navigate(['/signup']);
    return false;
  }

  const seen = await supabase.hasSeenImmersion();
  if (seen) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
