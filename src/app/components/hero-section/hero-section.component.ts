import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" #heroSection>
      <div class="hero-background">
        <div class="floating-leaf leaf-1"></div>
        <div class="floating-leaf leaf-2"></div>
        <div class="floating-leaf leaf-3"></div>
        <div class="gradient-orb"></div>
      </div>
      
      <div class="hero-content container">
        <div class="hero-text">
          <span class="tagline" #tagline>100% Natural &bull; Chemical-Free &bull; Ayurvedic Care</span>
          <h1 class="heading-display heading-xl" #headline>
            <span class="line">Pure Nature.</span>
            <span class="line accent">Powerful Hair Transformation.</span>
          </h1>
          <p class="hero-description body-lg" #description>
            Experience the richness of hibiscus, shikakai, and herbal powders crafted to 
            nourish, strengthen, and revive your hair naturally.
          </p>
          <div class="hero-cta" #ctaButtons>
            <button class="btn btn-primary">
              Shop Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button class="btn btn-outline">Explore Ingredients</button>
          </div>
          <div class="hero-stats" #stats>
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Natural Ingredients</span>
            </div>
            <div class="stat">
              <span class="stat-number">0%</span>
              <span class="stat-label">Harsh Chemicals</span>
            </div>
            <div class="stat">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
        
        <div class="hero-visual" #heroVisual>
          <div class="product-glow"></div>
          <div class="product-container">
            <img 
              [src]="productImage" 
              alt="Smitha Pure Life Avosilk Bloom Conditioner" 
              class="product-image"
            />
          </div>
          <div class="floating-ingredients">
            <div class="ingredient ingredient-1">
              <img src="https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=100&h=100&fit=crop" alt="Hibiscus" />
              <span>Hibiscus</span>
            </div>
            <div class="ingredient ingredient-2">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop" alt="Shikakai" />
              <span>Shikakai</span>
            </div>
            <div class="ingredient ingredient-3">
              <img src="https://images.unsplash.com/photo-1523293915678-d126868e96f1?w=100&h=100&fit=crop" alt="Herbal Powder" />
              <span>Herbal</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator" #scrollIndicator>
        <span>Scroll to Explore</span>
        <div class="scroll-line">
          <div class="scroll-dot"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 100px;
    }
    
    .hero-background {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .floating-leaf {
      position: absolute;
      width: 100px;
      height: 100px;
      opacity: 0.1;
      background: var(--color-primary);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      
      &.leaf-1 {
        top: 20%;
        left: 10%;
        animation: float 8s ease-in-out infinite;
      }
      
      &.leaf-2 {
        top: 60%;
        right: 15%;
        width: 60px;
        height: 60px;
        animation: float 6s ease-in-out infinite reverse;
      }
      
      &.leaf-3 {
        bottom: 20%;
        left: 30%;
        width: 40px;
        height: 40px;
        animation: float 10s ease-in-out infinite 1s;
      }
    }
    
    .gradient-orb {
      position: absolute;
      top: -50%;
      right: -20%;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(60px);
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .hero-text {
      max-width: 600px;
    }
    
    .tagline {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 1.5rem;
      padding: 0.5rem 1rem;
      background: rgba(var(--color-accent-rgb), 0.1);
      border-radius: 2rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
      color: var(--color-primary);
      
      .line {
        display: block;
      }
      
      .accent {
        color: var(--color-accent-dark);
      }
    }
    
    .hero-description {
      color: var(--color-charcoal-light);
      margin-bottom: 2.5rem;
      max-width: 500px;
    }
    
    .hero-cta {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
    }
    
    .hero-stats {
      display: flex;
      gap: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(26, 58, 47, 0.1);
    }
    
    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .stat-number {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 600;
      color: var(--color-primary);
    }
    
    .stat-label {
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      color: var(--color-charcoal-light);
      text-transform: uppercase;
    }
    
    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .product-glow {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(var(--color-accent-rgb), 0.3) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(40px);
      animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    .product-container {
      position: relative;
      width: 350px;
      height: 450px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 30px 60px rgba(26, 58, 47, 0.3));
      transition: transform 0.6s var(--transition-smooth);
      
      &:hover {
        transform: scale(1.05) rotate(2deg);
      }
    }
    
    .floating-ingredients {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .ingredient {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--color-cream);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      }
      
      span {
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-primary);
        background: var(--color-cream);
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
      }
      
      &.ingredient-1 {
        top: 10%;
        left: 0;
        animation: floatIngredient 6s ease-in-out infinite;
      }
      
      &.ingredient-2 {
        top: 30%;
        right: -5%;
        animation: floatIngredient 5s ease-in-out infinite 1s;
      }
      
      &.ingredient-3 {
        bottom: 20%;
        left: 5%;
        animation: floatIngredient 7s ease-in-out infinite 2s;
      }
    }
    
    @keyframes floatIngredient {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      
      span {
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--color-charcoal-light);
      }
    }
    
    .scroll-line {
      width: 1px;
      height: 60px;
      background: rgba(26, 58, 47, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .scroll-dot {
      width: 3px;
      height: 10px;
      background: var(--color-accent);
      border-radius: 2px;
      position: absolute;
      left: -1px;
      animation: scrollDown 2s ease-in-out infinite;
    }
    
    @keyframes scrollDown {
      0% { top: 0; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { top: 50px; opacity: 0; }
    }
    
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-text {
        max-width: 100%;
        order: 2;
      }
      
      .hero-visual {
        order: 1;
        margin-bottom: 2rem;
      }
      
      .hero-description {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-cta {
        justify-content: center;
      }
      
      .hero-stats {
        justify-content: center;
      }
      
      .product-container {
        width: 280px;
        height: 360px;
      }
      
      .floating-ingredients {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      .hero {
        padding-top: 80px;
      }
      
      .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
      }
      
      .hero-cta {
        flex-direction: column;
        
        .btn {
          width: 100%;
        }
      }
    }
  `]
})
export class HeroSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('tagline') tagline!: ElementRef;
  @ViewChild('headline') headline!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('ctaButtons') ctaButtons!: ElementRef;
  @ViewChild('stats') stats!: ElementRef;
  @ViewChild('heroVisual') heroVisual!: ElementRef;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef;

  productImage = 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=500&fit=crop';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.initAnimations(), 1500);
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set([
      this.tagline.nativeElement,
      this.headline.nativeElement.querySelectorAll('.line'),
      this.description.nativeElement,
      this.ctaButtons.nativeElement.children,
      this.stats.nativeElement.children,
      this.heroVisual.nativeElement,
      this.scrollIndicator.nativeElement
    ], { opacity: 0, y: 30 });

    tl.to(this.tagline.nativeElement, { opacity: 1, y: 0, duration: 0.8 })
      .to(this.headline.nativeElement.querySelectorAll('.line'), { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15 
      }, '-=0.4')
      .to(this.description.nativeElement, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(this.ctaButtons.nativeElement.children, { 
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1 
      }, '-=0.4')
      .to(this.stats.nativeElement.children, { 
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1 
      }, '-=0.3')
      .to(this.heroVisual.nativeElement, { 
        opacity: 1, y: 0, duration: 1, ease: 'power2.out' 
      }, '-=0.8')
      .to(this.scrollIndicator.nativeElement, { 
        opacity: 1, y: 0, duration: 0.6 
      }, '-=0.3');
  }
}
