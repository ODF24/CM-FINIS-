import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

interface Scene {
  img: string;
  title: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-immersive-gateway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './immersive-gateway.component.html',
  styleUrls: ['./immersive-gateway.component.scss']  // ← Tableau avec crochets []
})
export class ImmersiveGatewayComponent implements OnInit, OnDestroy {
  currentScene = 0;
  transitioning = false;
  completed = false;
  progress = 0;
  private progressInterval: any;
  private sceneTimer: any;
  SCENE_DURATION = 4000;

  scenes: Scene[] = [
    {
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776360781/Image_1.jpg_1_eizis6.jpg',
      title: 'Bienvenue au Congo',
      text: 'Un pays d\'une beauté et d\'une richesse extraordinaires, au cœur de l\'Afrique.',
      icon: '🇨🇬'
    },
    {
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776360954/Image_2.jpg_1_a0atn0.jpg',
      title: 'Une Histoire Millénaire',
      text: 'Des royaumes anciens aux temps modernes, découvrez les bâtisseurs d\'une nation.',
      icon: '🏛️'
    },
    {
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775303581/teste_111-01_aqcxwp.jpg',
      title: 'Nature & Culture',
      text: 'Forêts équatoriales, fleuve Congo, art et musique — une identité unique au monde.',
      icon: '🌿'
    },
    {
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776360781/Image_1.jpg_1_eizis6.jpg',
      title: 'L\'Aventure Commence',
      text: 'Vous êtes prêt(e) à explorer le Congo Metaverse. Bonne découverte !',
      icon: '✨'
    }
  ];

  constructor(private router: Router, private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.startSceneTimer();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  startSceneTimer(): void {
    this.progress = 0;
    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      this.progress += 100 / (this.SCENE_DURATION / 50);
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.progressInterval);
        this.nextScene();
      }
    }, 50);
  }

  nextScene(): void {
    if (this.transitioning) return;
    if (this.currentScene < this.scenes.length - 1) {
      this.transitioning = true;
      setTimeout(() => {
        this.currentScene++;
        this.transitioning = false;
        this.startSceneTimer();
      }, 600);
    } else {
      this.finishImmersion();
    }
  }

  prevScene(): void {
    if (this.transitioning || this.currentScene === 0) return;
    this.transitioning = true;
    clearInterval(this.progressInterval);
    setTimeout(() => {
      this.currentScene--;
      this.transitioning = false;
      this.startSceneTimer();
    }, 600);
  }

  goToScene(idx: number): void {
    if (this.transitioning || idx === this.currentScene) return;
    this.transitioning = true;
    clearInterval(this.progressInterval);
    setTimeout(() => {
      this.currentScene = idx;
      this.transitioning = false;
      this.startSceneTimer();
    }, 600);
  }

  async finishImmersion(): Promise<void> {
    this.clearTimers();
    this.completed = true;
    const user = this.supabase.currentUser;
    if (user) {
      await this.supabase.markImmersionSeen();
    }
  }

  async enterSite(): Promise<void> {
    this.router.navigate(['/home']);
  }

  clearTimers(): void {
    clearInterval(this.progressInterval);
    clearTimeout(this.sceneTimer);
  }
}