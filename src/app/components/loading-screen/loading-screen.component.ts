import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="loading-screen" 
      [class.hidden]="isHidden()"
      [class.fade-out]="isFadingOut()"
    >
      <div class="loading-content">
        <div class="logo-container">
          <svg class="leaf-icon" viewBox="0 0 60 60" fill="none">
            <path 
              d="M30 5C30 5 15 15 15 30C15 45 30 55 30 55C30 55 45 45 45 30C45 15 30 5 30 5Z" 
              stroke="currentColor" 
              stroke-width="2"
              fill="none"
              class="leaf-path"
            />
            <path 
              d="M30 15V45" 
              stroke="currentColor" 
              stroke-width="1.5"
              class="stem-path"
            />
            <path 
              d="M30 25L22 20M30 35L38 30M30 30L24 35" 
              stroke="currentColor" 
              stroke-width="1"
              class="vein-paths"
            />
          </svg>
        </div>
        <div class="brand-name">Herbalia</div>
        <div class="loading-bar">
          <div class="loading-progress" [style.width.%]="progress()"></div>
        </div>
        <div class="loading-text">{{ loadingText() }}</div>
      </div>
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary);
      transition: opacity 0.8s ease, visibility 0.8s ease;
    }
    
    .loading-screen.fade-out {
      opacity: 0;
    }
    
    .loading-screen.hidden {
      visibility: hidden;
      pointer-events: none;
    }
    
    .loading-content {
      text-align: center;
      color: var(--color-cream);
    }
    
    .logo-container {
      margin-bottom: 1.5rem;
    }
    
    .leaf-icon {
      width: 80px;
      height: 80px;
      color: var(--color-accent);
    }
    
    .leaf-path {
      stroke-dasharray: 150;
      stroke-dashoffset: 150;
      animation: drawLeaf 2s ease forwards;
    }
    
    .stem-path {
      stroke-dasharray: 30;
      stroke-dashoffset: 30;
      animation: drawStem 1s ease 0.5s forwards;
    }
    
    .vein-paths {
      stroke-dasharray: 50;
      stroke-dashoffset: 50;
      animation: drawVeins 1s ease 1s forwards;
    }
    
    @keyframes drawLeaf {
      to { stroke-dashoffset: 0; }
    }
    
    @keyframes drawStem {
      to { stroke-dashoffset: 0; }
    }
    
    @keyframes drawVeins {
      to { stroke-dashoffset: 0; }
    }
    
    .brand-name {
      font-family: var(--font-heading);
      font-size: 2.5rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      margin-bottom: 2rem;
      text-transform: uppercase;
    }
    
    .loading-bar {
      width: 200px;
      height: 2px;
      background-color: rgba(248, 245, 240, 0.2);
      margin: 0 auto 1rem;
      overflow: hidden;
      border-radius: 1px;
    }
    
    .loading-progress {
      height: 100%;
      background-color: var(--color-accent);
      transition: width 0.3s ease;
    }
    
    .loading-text {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      opacity: 0.7;
    }
  `]
})
export class LoadingScreenComponent implements OnInit {
  progress = signal(0);
  loadingText = signal('Loading experience');
  isFadingOut = signal(false);
  isHidden = signal(false);

  ngOnInit(): void {
    this.animateLoading();
  }

  private animateLoading(): void {
    const texts = ['Loading experience', 'Preparing visuals', 'Almost ready'];
    let currentProgress = 0;
    let textIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        this.progress.set(100);
        this.loadingText.set('Welcome');
        clearInterval(interval);
        
        setTimeout(() => {
          this.isFadingOut.set(true);
          setTimeout(() => {
            this.isHidden.set(true);
          }, 800);
        }, 500);
      } else {
        this.progress.set(Math.min(currentProgress, 95));
        
        if (currentProgress > 33 && textIndex === 0) {
          textIndex = 1;
          this.loadingText.set(texts[1]);
        } else if (currentProgress > 66 && textIndex === 1) {
          textIndex = 2;
          this.loadingText.set(texts[2]);
        }
      }
    }, 200);
  }
}
