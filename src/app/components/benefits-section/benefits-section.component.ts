import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="benefits" id="benefits" #benefitsSection>
      <div class="container">
        <div class="benefits-layout">
          <div class="benefits-content" #benefitsContent>
            <span class="section-tag">Why Choose Herbalia</span>
            <h2 class="heading-display heading-lg">Benefits That Speak for Themselves</h2>
            <p class="body-lg">
              Our unique formula combines ancient wisdom with modern science 
              to deliver results you can see and feel.
            </p>
            
            <div class="benefits-list">
              @for (benefit of benefits; track benefit.title) {
                <div class="benefit-item">
                  <div class="benefit-icon" [innerHTML]="benefit.icon"></div>
                  <div class="benefit-text">
                    <h4>{{ benefit.title }}</h4>
                    <p>{{ benefit.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div class="benefits-visual" #benefitsVisual>
            <div class="visual-wrapper">
              <div class="before-after">
                <div class="comparison-image before">
                  <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=600&fit=crop" alt="Before using Herbalia" />
                  <span class="label">Before</span>
                </div>
                <div class="comparison-image after">
                  <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=600&fit=crop" alt="After using Herbalia" />
                  <span class="label">After 30 Days</span>
                </div>
              </div>
              <div class="stat-badge" #statBadge>
                <span class="stat-number">94%</span>
                <span class="stat-text">saw visible improvement</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="trust-badges" #trustBadges>
          <div class="badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>100% Natural</span>
          </div>
          <div class="badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span>Results in 30 Days</span>
          </div>
          <div class="badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>Cruelty Free</span>
          </div>
          <div class="badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>Eco Packaging</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .benefits {
      padding: var(--space-xl) 0;
      background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-primary) 100%);
    }
    
    .benefits-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
      align-items: center;
      margin-bottom: var(--space-lg);
    }
    
    .benefits-content {
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
      
      > p {
        color: var(--color-charcoal-light);
        margin-bottom: var(--space-md);
        max-width: 450px;
      }
    }
    
    .benefits-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .benefit-item {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateX(10px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      }
    }
    
    .benefit-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(196, 163, 90, 0.15);
      border-radius: 12px;
      color: var(--color-accent-dark);
      
      :host ::ng-deep svg {
        width: 24px;
        height: 24px;
      }
    }
    
    .benefit-text {
      h4 {
        font-family: var(--font-heading);
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: 0.25rem;
      }
      
      p {
        font-size: 0.875rem;
        color: var(--color-charcoal-light);
        line-height: 1.5;
      }
    }
    
    .benefits-visual {
      position: relative;
    }
    
    .visual-wrapper {
      position: relative;
    }
    
    .before-after {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .comparison-image {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
      
      .label {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-cream);
        background: rgba(26, 58, 47, 0.8);
        padding: 0.5rem 1rem;
        border-radius: 2rem;
      }
    }
    
    .stat-badge {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-accent);
      color: var(--color-primary-dark);
      padding: 1rem 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(196, 163, 90, 0.4);
    }
    
    .stat-number {
      display: block;
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
    }
    
    .stat-text {
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }
    
    .trust-badges {
      display: flex;
      justify-content: center;
      gap: 3rem;
      padding-top: var(--space-md);
      border-top: 1px solid rgba(248, 245, 240, 0.2);
    }
    
    .badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      color: var(--color-cream);
      text-align: center;
      
      svg {
        opacity: 0.8;
      }
      
      span {
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        opacity: 0.9;
      }
    }
    
    @media (max-width: 1024px) {
      .benefits-layout {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .benefits-content > p {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      
      .benefits-visual {
        order: -1;
      }
      
      .benefit-item {
        text-align: left;
      }
    }
    
    @media (max-width: 640px) {
      .before-after {
        grid-template-columns: 1fr;
      }
      
      .comparison-image img {
        height: 250px;
      }
      
      .trust-badges {
        flex-wrap: wrap;
        gap: 2rem;
      }
    }
  `]
})
export class BenefitsSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('benefitsSection') benefitsSection!: ElementRef;
  @ViewChild('benefitsContent') benefitsContent!: ElementRef;
  @ViewChild('benefitsVisual') benefitsVisual!: ElementRef;
  @ViewChild('statBadge') statBadge!: ElementRef;
  @ViewChild('trustBadges') trustBadges!: ElementRef;

  benefits: Benefit[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>`,
      title: 'Strengthens Hair Roots',
      description: 'Deep nourishment for stronger, more resilient hair from the roots.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>`,
      title: 'Adds Natural Shine',
      description: 'Restores brilliance and luster without artificial chemicals.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>`,
      title: 'Reduces Hair Fall',
      description: 'Clinically proven to reduce hair fall by up to 60% in 8 weeks.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 6v6l4 2"/>
      </svg>`,
      title: 'Quick Results',
      description: 'See visible improvement in hair texture within just 2 weeks.'
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
    // Content animation
    const contentST = ScrollTrigger.create({
      trigger: this.benefitsContent.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.benefitsContent.nativeElement.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(contentST);

    // Visual animation
    const visualST = ScrollTrigger.create({
      trigger: this.benefitsVisual.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.benefitsVisual.nativeElement.querySelectorAll('.comparison-image'), {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        });
        
        gsap.from(this.statBadge.nativeElement, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'back.out(1.7)'
        });
      }
    });
    this.scrollTriggers.push(visualST);

    // Trust badges animation
    const badgesST = ScrollTrigger.create({
      trigger: this.trustBadges.nativeElement,
      start: 'top 90%',
      onEnter: () => {
        gsap.from(this.trustBadges.nativeElement.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(badgesST);
  }
}
