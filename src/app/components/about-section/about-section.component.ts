import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductService } from '../../services/product.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about" id="about" #aboutSection>
      <div class="glass-blob blob-accent" style="top: 10%; left: -100px;"></div>
      <div class="glass-blob blob-primary" style="bottom: 10%; right: -100px;"></div>
      
      <div class="floating-leaf" style="top: 20%; right: 10%; animation-delay: -2s;">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>
      </div>
      <div class="floating-leaf" style="bottom: 15%; left: 5%; animation-delay: -7s; transform: rotate(180deg);">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>
      </div>

      <div class="container">
        <div class="about-layout">
          <div class="about-image" #aboutImage>
            <div class="image-wrapper">
              <img 
                [src]="product.image" 
                [alt]="product.name"
              />
              <div class="image-accent"></div>
            </div>
            
          </div>
          
          <div class="about-content" #aboutContent>
            <span class="section-tag">Targeted Care</span>
            <h2 class="heading-display heading-lg">Science of Regrowth, Soul of Ayurveda</h2>
            <p class="about-intro body-lg">
              Smitha Pure Life Follicra Regrowth Serum is a high-potency elixir 
              engineered to activate dormant follicles and restore hair density.
            </p>
            <p class="about-detail">
              By combining 15 potent botanical extracts with modern delivery systems, this serum 
              penetrates deep into the scalp to nourish roots and significantly reduce hair fall. 
              It&apos;s not just a serum; it&apos;s a second life for your hair.
            </p>
            <div class="about-features">
              <div class="feature">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Root Activation</h4>
                  <p>Awakens dormant follicles</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Follicle Nutrition</h4>
                  <p>15 Potent botanical extracts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: var(--space-lg) 0;
      background-color: var(--color-cream);
      overflow: hidden;
    }
    
    .about-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
      align-items: center;
    }
    
    .about-image {
      position: relative;
    }
    
    .image-wrapper {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 350px;
        object-fit: contain;
        background: white;
        padding: 2rem;
        border: 1px solid rgba(26, 58, 47, 0.08);
        border-radius: 24px;
      }
    }
    
    .image-accent {
      position: absolute;
      bottom: -20px;
      right: -20px;
      width: 200px;
      height: 200px;
      background: var(--color-accent);
      opacity: 0.2;
      border-radius: 20px;
      z-index: -1;
    }
    
    .floating-badge {
      position: absolute;
      bottom: 2rem;
      right: -1rem;
      background: var(--color-primary);
      color: var(--color-cream);
      padding: 1.5rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(26, 58, 47, 0.3);
    }
    
    .badge-number {
      display: block;
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
    }
    
    .badge-text {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.8;
    }
    
    .about-content {
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
      
      .about-intro {
        color: var(--color-charcoal);
        margin-bottom: 1rem;
      }
      
      .about-detail {
        color: var(--color-charcoal-light);
        margin-bottom: 2rem;
        line-height: 1.8;
      }
    }
    
    .about-features {
      display: flex;
      gap: 2rem;
    }
    
    .feature {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .feature-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(196, 163, 90, 0.15);
      border-radius: 12px;
      color: var(--color-accent-dark);
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
    
    .feature-text {
      h4 {
        font-family: var(--font-heading);
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: 0.25rem;
      }
      
      p {
        font-size: 0.875rem;
        color: var(--color-charcoal-light);
      }
    }
    
    @media (max-width: 1024px) {
      .about-layout {
        grid-template-columns: 1fr;
        gap: var(--space-md);
      }
      
      .about-image {
        order: -1;
      }
      
      .image-wrapper img {
        height: 350px;
      }
      
      .floating-badge {
        bottom: 1rem;
        right: 1rem;
      }
    }
    
    @media (max-width: 640px) {
      .about-features {
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  `]
})
export class AboutSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('aboutImage') aboutImage!: ElementRef;
  @ViewChild('aboutContent') aboutContent!: ElementRef;
  @ViewChild('floatingBadge') floatingBadge!: ElementRef;

  private productService = inject(ProductService);
  product = this.productService.products()[2];

  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }

  private initAnimations(): void {
    // Image animation
    const imageST = ScrollTrigger.create({
      trigger: this.aboutImage.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.aboutImage.nativeElement.querySelector('.image-wrapper'), {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
        
        gsap.from(this.floatingBadge.nativeElement, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(1.7)'
        });
      }
    });
    this.scrollTriggers.push(imageST);

    // Content animation
    const contentST = ScrollTrigger.create({
      trigger: this.aboutContent.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.aboutContent.nativeElement.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(contentST);
  }
}
