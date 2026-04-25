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
            <div class="floating-badge" #floatingBadge>
              <span class="badge-number">100%</span>
              <span class="badge-text">Natural</span>
            </div>
          </div>
          
          <div class="about-content" #aboutContent>
            <span class="section-tag">Our Philosophy</span>
            <h2 class="heading-display heading-lg">A Ritual, Not Just a Product</h2>
            <p class="about-intro body-lg">
              Smitha Pure Life Avosilk Bloom Conditioner is a blend of time-tested Ayurvedic 
              ingredients designed to restore your hair&apos;s natural strength and shine.
            </p>
            <p class="about-detail">
              Infused with hibiscus, shikakai, and herbal powders, it gently cleanses, nourishes, 
              and protects your hair from damage. This is not just hair care &mdash; it&apos;s a return to nature.
            </p>
            <div class="about-features">
              <div class="feature">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Time-Tested</h4>
                  <p>Ancient Ayurvedic wisdom</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Carefully Crafted</h4>
                  <p>Premium botanical blends</p>
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
      padding: var(--space-xl) 0;
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
        height: 500px;
        object-fit: cover;
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
  product = this.productService.products()[0];

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
