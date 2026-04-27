import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CleanItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-clean-promise',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="clean-promise" #cleanSection>
      <div class="container">
        <div class="clean-header" #header>
          <span class="section-tag">Pure & Conscious</span>
          <h2 class="heading-display heading-lg">What We Leave Out Matters</h2>
          <p class="body-lg">
            Our commitment to purity means excluding anything that compromises your hair's health. 
            We focus on 100% natural efficacy without the hidden costs of synthetics.
          </p>
        </div>
        
        <div class="clean-grid" #cleanGrid>
          @for (item of cleanItems; track item.title; let i = $index) {
            <div class="clean-item" [style.--index]="i" #cleanItem>
              <div class="item-visual">
                <div class="item-icon" [innerHTML]="item.icon"></div>
                <div class="prohibited-line"></div>
              </div>
              <div class="item-content">
                <span class="no-tag">No</span>
                <h3>{{ item.title }}</h3>
                <p class="item-description">{{ item.description }}</p>
              </div>
              <div class="check-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          }
        </div>
        
        <div class="clean-cta" #cleanCta>
          <p>Transparency is our promise. Every ingredient is sourced ethically and tested for purity.</p>
          <button class="btn btn-primary">Download Full Ingredient Glossary</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .clean-promise {
      padding: var(--space-lg) 0;
      background: transparent;
      perspective: 2000px;
    }
    
    .clean-header {
      text-align: center;
      margin-bottom: var(--space-xl);
      
      .section-tag {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin-bottom: 1.5rem;
      }
      
      h2 {
        color: var(--color-primary);
        margin-bottom: 1.5rem;
      }
      
      p {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-charcoal-light);
      }
    }
    
    .clean-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto var(--space-lg);
      transform-style: preserve-3d;
    }
    
    .clean-item {
      position: relative;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      border-radius: 32px;
      padding: 3rem 2rem;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.5);
      transition: all 0.5s var(--transition-smooth);
      transform-style: preserve-3d;
      
      &:hover {
        transform: translateY(-15px) rotateX(5deg);
        background: white;
        box-shadow: 0 30px 60px rgba(26, 58, 47, 0.15);
        
        .item-visual {
          transform: translateZ(50px) scale(1.1);
        }
        
        .item-content h3 {
          color: var(--color-accent-dark);
        }

        .check-mark {
          opacity: 1;
          transform: scale(1) translateZ(30px);
        }
      }
    }
    
    .item-visual {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s var(--transition-smooth);
      transform-style: preserve-3d;
    }

    .item-icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(231, 76, 60, 0.1);
      border-radius: 50%;
      color: #e74c3c;
      
      :host ::ng-deep svg {
        width: 32px;
        height: 32px;
      }
    }

    .prohibited-line {
      position: absolute;
      width: 100%;
      height: 4px;
      background: #e74c3c;
      transform: rotate(-45deg);
      border-radius: 2px;
      opacity: 0.8;
    }
    
    .no-tag {
      display: block;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #e74c3c;
      margin-bottom: 0.75rem;
    }
    
    .item-content {
      transform: translateZ(20px);

      h3 {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: 1rem;
        transition: color 0.3s ease;
      }

      .item-description {
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--color-charcoal-light);
        opacity: 0.8;
      }
    }
    
    .check-mark {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 40px;
      height: 40px;
      background: var(--color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-cream);
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.4s var(--transition-smooth);
      box-shadow: 0 10px 20px rgba(26, 58, 47, 0.2);
    }
    
    .clean-cta {
      text-align: center;
      padding-top: var(--space-lg);
      
      p {
        color: var(--color-charcoal-light);
        margin-bottom: 2.5rem;
        font-style: italic;
      }
    }
    
    @media (max-width: 1024px) {
      .clean-grid {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 2rem;
      }
    }
    
    @media (max-width: 640px) {
      .clean-grid {
        grid-template-columns: 1fr;
      }
      
      .clean-item {
        padding: 2.5rem 1.5rem;
      }
    }
  `]
})
export class CleanPromiseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cleanSection') cleanSection!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('cleanGrid') cleanGrid!: ElementRef;
  @ViewChild('cleanCta') cleanCta!: ElementRef;
  @ViewChildren('cleanItem') cleanItemElements!: QueryList<ElementRef>;

  cleanItems: CleanItem[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>`,
      title: 'Sulphates',
      description: 'Aggressive cleansers that strip natural oils and can cause scalp irritation and dryness.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>`,
      title: 'Parabens',
      description: 'Synthetic preservatives linked to hormonal disruption and potential long-term health risks.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
      title: 'Silicones',
      description: 'Create a fake shine by coating hair, leading to buildup that prevents moisture from penetrating.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>`,
      title: 'Mineral Oils',
      description: 'Petroleum-derived oils that clog pores and weigh down hair, inhibiting natural growth cycles.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
        <line x1="9.69" y1="8" x2="21.17" y2="8"/>
        <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
        <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
        <line x1="14.31" y1="16" x2="2.83" y2="16"/>
        <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
      </svg>`,
      title: 'Phthalates',
      description: 'Chemical plasticizers often hidden in fragrances that are toxic to both body and environment.'
    }
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    this.initAnimations();
    this.initTiltEffect();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }

  private initTiltEffect(): void {
    this.cleanItemElements.forEach((item: ElementRef) => {
      const el = item.nativeElement;
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(el, {
          rotationY: x * 15,
          rotationX: -y * 15,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }

  private initAnimations(): void {
    // Header animation
    gsap.from(this.header.nativeElement.children, {
      scrollTrigger: {
        trigger: this.header.nativeElement,
        start: 'top 85%'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // Grid items animation
    gsap.from(this.cleanGrid.nativeElement.children, {
      scrollTrigger: {
        trigger: this.cleanGrid.nativeElement,
        start: 'top 80%'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // CTA animation
    gsap.from(this.cleanCta.nativeElement.children, {
      scrollTrigger: {
        trigger: this.cleanCta.nativeElement,
        start: 'top 90%'
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }
}
