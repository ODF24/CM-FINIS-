import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Guard: l'utilisateur doit être connecté
export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  if (supabase.isLoggedIn) return true;

  router.navigate(['/inscription']);
  return false;
};
