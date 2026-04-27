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
          <img src="assets/images/logo.png" alt="Smitha Pure Life" class="loading-logo" />
        </div>
        <div class="brand-name">Smitha Pure Life</div>
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
      margin-bottom: 2rem;
    }
    
    .loading-logo {
      width: 120px;
      height: 120px;
      object-fit: contain;
      border: none;
      outline: none;
      animation: logoPulse 2s ease-in-out infinite;
    }
    
    @keyframes logoPulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.05); opacity: 1; }
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
