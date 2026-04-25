import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CleanItem {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-clean-promise',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="clean-promise" #cleanSection>
      <div class="container">
        <div class="clean-header" #header>
          <span class="section-tag">Our Promise</span>
          <h2 class="heading-display heading-lg">What We Leave Out Matters</h2>
          <p class="body-lg">
            Clean beauty is not a trend for us &mdash; it&apos;s a commitment. Every ingredient is 
            carefully vetted to ensure it&apos;s safe for you and the environment.
          </p>
        </div>
        
        <div class="clean-grid" #cleanGrid>
          @for (item of cleanItems; track item.title; let i = $index) {
            <div class="clean-item" [style.--index]="i">
              <div class="item-icon" [innerHTML]="item.icon"></div>
              <div class="item-content">
                <span class="strike">No</span>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="check-mark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          }
        </div>
        
        <div class="clean-cta" #cleanCta>
          <p>Transparency is our promise. Every ingredient is sourced ethically and tested for purity.</p>
          <button class="btn btn-outline">View Full Ingredient List</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .clean-promise {
      padding: var(--space-xl) 0;
      background: linear-gradient(180deg, var(--color-cream) 0%, white 100%);
    }
    
    .clean-header {
      text-align: center;
      margin-bottom: var(--space-lg);
      
      .section-tag {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin-bottom: 1rem;
      }
      
      h2 {
        color: var(--color-primary);
        margin-bottom: 1.5rem;
      }
      
      p {
        max-width: 600px;
        margin: 0 auto;
        color: var(--color-charcoal-light);
      }
    }
    
    .clean-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.5rem;
      margin-bottom: var(--space-md);
    }
    
    .clean-item {
      position: relative;
      background: white;
      border-radius: 16px;
      padding: 2rem 1.5rem;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(26, 58, 47, 0.05);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        
        .check-mark {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
    
    .item-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(220, 53, 69, 0.1);
      border-radius: 50%;
      color: #dc3545;
      
      :host ::ng-deep svg {
        width: 28px;
        height: 28px;
      }
    }
    
    .item-content {
      .strike {
        display: block;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #dc3545;
        margin-bottom: 0.25rem;
      }
      
      h3 {
        font-family: var(--font-heading);
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-primary);
      }
    }
    
    .check-mark {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 32px;
      height: 32px;
      background: var(--color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-cream);
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.3s ease;
    }
    
    .clean-cta {
      text-align: center;
      padding-top: var(--space-md);
      
      p {
        color: var(--color-charcoal-light);
        margin-bottom: 1.5rem;
      }
    }
    
    @media (max-width: 1024px) {
      .clean-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .clean-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .clean-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CleanPromiseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cleanSection') cleanSection!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('cleanGrid') cleanGrid!: ElementRef;
  @ViewChild('cleanCta') cleanCta!: ElementRef;

  cleanItems: CleanItem[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>`,
      title: 'Sulphates'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>`,
      title: 'Parabens'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>`,
      title: 'Silicones'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>`,
      title: 'Artificial Colors'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>`,
      title: 'Harmful Chemicals'
    }
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }

  private initAnimations(): void {
    // Header animation
    const headerST = ScrollTrigger.create({
      trigger: this.header.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.header.nativeElement.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(headerST);

    // Grid items animation
    const gridST = ScrollTrigger.create({
      trigger: this.cleanGrid.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.cleanGrid.nativeElement.children, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });
      }
    });
    this.scrollTriggers.push(gridST);

    // CTA animation
    const ctaST = ScrollTrigger.create({
      trigger: this.cleanCta.nativeElement,
      start: 'top 90%',
      onEnter: () => {
        gsap.from(this.cleanCta.nativeElement.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(ctaST);
  }
}
