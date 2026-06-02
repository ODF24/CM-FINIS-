# 🔧 Configuration Supabase — Congo Metaverse

## 1. Créer un projet Supabase
Rendez-vous sur [supabase.com](https://supabase.com) → **New Project**

## 2. Exécuter le schéma SQL
Dans votre projet Supabase → **SQL Editor** → coller le contenu de `supabase/schema.sql` → **Run**

## 3. Récupérer vos clés API
**Settings → API** :
- `Project URL` → copier dans `environment.ts`
- `anon public key` → copier dans `environment.ts`

## 4. Mettre à jour `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://XXXX.supabase.co',         // ← votre URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5...'   // ← votre clé anon
  }
};
```

## 5. Activer l'Auth Email dans Supabase
**Authentication → Providers → Email** → activer

## 6. Lancer le projet
```bash
npm install
ng serve
```

---

## Flux d'inscription (une seule immersion)

```
/signup
  ↓ Inscription Supabase Auth
  ↓ Création automatique du profil (has_seen_immersion = false)
/welcome       ← Guard: connecté ET has_seen_immersion = false
  ↓
/selection     ← Choix du type d'utilisateur
  ↓
/immersion     ← 4 slides découverte
  ↓ markImmersionSeen() → has_seen_immersion = true
/home          ← Toutes les fois suivantes, l'immersion est bloquée
```

## Architecture des guards
| Guard | Route | Logique |
|-------|-------|---------|
| `noAuthGuard` | `/signup`, `/inscription` | Redirige vers `/home` si déjà connecté |
| `immersionGuard` | `/welcome`, `/selection`, `/immersion` | Redirige vers `/home` si pas connecté OU déjà vu |
| `authGuard` | `/dashboard` | Redirige vers `/inscription` si pas connecté |
