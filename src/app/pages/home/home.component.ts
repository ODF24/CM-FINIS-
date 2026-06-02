import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  clockTime = '--:--';
  clockDate = '';
  timeOfDay = 'Congo';
  private clockInterval: any;

  ngOnInit(): void {
    // ── VERROUILLER le scroll sur la page d'accueil ──────────
    document.body.style.overflow            = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height              = '100vh';
    document.documentElement.style.height   = '100vh';

    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    // ── DÉVERROUILLER quand on quitte la page ────────────────
    document.body.style.overflow            = '';
    document.documentElement.style.overflow = '';
    document.body.style.height              = '';
    document.documentElement.style.height   = '';

    clearInterval(this.clockInterval);
  }

  ngAfterViewInit(): void {
    this.initSkyCanvas();
    this.initStars();
    this.initFireflies();
  }

  getBrazzavilleTime(): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000);
  }

  updateClock(): void {
    const t = this.getBrazzavilleTime();
    this.clockTime = String(t.getHours()).padStart(2,'0') + ':' + String(t.getMinutes()).padStart(2,'0');
    const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
    this.clockDate = t.getDate() + ' ' + months[t.getMonth()] + ' ' + t.getFullYear();
    const h = t.getHours();
    if      (h >= 5  && h < 12) this.timeOfDay = '🌅 Matin';
    else if (h >= 12 && h < 18) this.timeOfDay = '☀️ Après-midi';
    else if (h >= 18 && h < 21) this.timeOfDay = '🌇 Soir';
    else                        this.timeOfDay = '🌙 Nuit';
  }

  initSkyCanvas(): void {
    const canvas = document.getElementById('sky-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const h = this.getBrazzavilleTime().getHours();
      let top: string, bottom: string;
      if      (h >= 5  && h < 7)  { top = '#1a0a3a'; bottom = '#c8502a'; }
      else if (h >= 7  && h < 10) { top = '#0d2a42'; bottom = '#2a6a8a'; }
      else if (h >= 10 && h < 17) { top = '#0a1e35'; bottom = '#1a4a6a'; }
      else if (h >= 17 && h < 20) { top = '#1a0a25'; bottom = '#cc4400'; }
      else                        { top = '#060d1a'; bottom = '#102030'; }
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, top); g.addColorStop(1, bottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    draw();
    window.addEventListener('resize', draw);
  }

  initStars(): void {
    const container = document.getElementById('stars');
    if (!container) return;
    const h = this.getBrazzavilleTime().getHours();
    if (h >= 19 || h < 7) {
      container.style.opacity = '1';
      for (let i = 0; i < 150; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const sz = Math.random() * 2.5 + 0.5;
        s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random()*75}%;left:${Math.random()*100}%;animation-duration:${Math.random()*3+2}s;animation-delay:${Math.random()*3}s;`;
        container.appendChild(s);
      }
    }
  }

  initFireflies(): void {
    const container = document.getElementById('fireflies');
    if (!container) return;
    const h = this.getBrazzavilleTime().getHours();
    if (h >= 19 || h < 5) {
      container.style.opacity = '1';
      for (let i = 0; i < 18; i++) {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        const dx = () => (Math.random()-.5)*200+'px';
        const dy = () => (Math.random()-.5)*200+'px';
        ff.style.cssText = `top:${Math.random()*100}%;left:${Math.random()*100}%;animation-duration:${Math.random()*10+8}s,${Math.random()*2+1}s;animation-delay:${Math.random()*5}s,${Math.random()*2}s;--dx1:${dx()};--dy1:${dy()};--dx2:${dx()};--dy2:${dy()};--dx3:${dx()};--dy3:${dy()};--dx4:${dx()};--dy4:${dy()};`;
        container.appendChild(ff);
      }
    }
  }
}
