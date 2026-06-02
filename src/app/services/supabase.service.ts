import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  user_type: string | null;  // 'touriste' | 'etudiant' | 'diaspora' | 'chercheur'
  has_seen_immersion: boolean;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _currentProfile = new BehaviorSubject<UserProfile | null>(null);

  currentUser$: Observable<User | null> = this._currentUser.asObservable();
  currentProfile$: Observable<UserProfile | null> = this._currentProfile.asObservable();

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      }
    );

    // Écouter les changements d'état d'authentification
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      this._currentUser.next(user);
      if (user) {
        await this.loadProfile(user.id);
      } else {
        this._currentProfile.next(null);
      }
    });

    // Charger la session existante au démarrage
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      this._currentUser.next(user);
      if (user) this.loadProfile(user.id);
    });
  }

  // ─── AUTH ────────────────────────────────────────────────

  async signUp(email: string, password: string, fullName: string): Promise<{ error: string | null }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) return { error: error.message };

    if (data.user) {
      // Créer le profil dans la table profiles
      const { error: profileError } = await this.supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          user_type: null,
          has_seen_immersion: false
        });

      if (profileError) console.error('Profile creation error:', profileError);
      await this.loadProfile(data.user.id);
    }

    return { error: null };
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.user) await this.loadProfile(data.user.id);
    return { error: null };
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this._currentUser.next(null);
    this._currentProfile.next(null);
    this.router.navigate(['/']);
  }

  // ─── PROFILE ─────────────────────────────────────────────

  private async loadProfile(userId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      this._currentProfile.next(data as UserProfile);
    }
  }

  async updateUserType(userType: string): Promise<{ error: string | null }> {
    const user = this._currentUser.getValue();
    if (!user) return { error: 'Non connecté' };

    const { error } = await this.supabase
      .from('profiles')
      .update({ user_type: userType })
      .eq('id', user.id);

    if (!error) await this.loadProfile(user.id);
    return { error: error?.message ?? null };
  }

  async markImmersionSeen(): Promise<{ error: string | null }> {
    const user = this._currentUser.getValue();
    if (!user) return { error: 'Non connecté' };

    const { error } = await this.supabase
      .from('profiles')
      .update({ has_seen_immersion: true })
      .eq('id', user.id);

    if (!error) await this.loadProfile(user.id);
    return { error: error?.message ?? null };
  }

  // ─── GETTERS ──────────────────────────────────────────────

  get currentUser(): User | null {
    return this._currentUser.getValue();
  }

  get currentProfile(): UserProfile | null {
    return this._currentProfile.getValue();
  }

  get isLoggedIn(): boolean {
    return this._currentUser.getValue() !== null;
  }

  async hasSeenImmersion(): Promise<boolean> {
    const user = this._currentUser.getValue();
    if (!user) return true; // Pas connecté = pas d'immersion
    const profile = this._currentProfile.getValue();
    if (profile) return profile.has_seen_immersion;
    // Recharger si nécessaire
    const { data } = await this.supabase
      .from('profiles')
      .select('has_seen_immersion')
      .eq('id', user.id)
      .single();
    return data?.has_seen_immersion ?? true;
  }

  async resetPassword(email: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });
    return { error: error?.message ?? null };
  }
}
