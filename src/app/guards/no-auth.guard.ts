import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Guard: si déjà connecté, rediriger vers /home
export const noAuthGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  if (supabase.isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
