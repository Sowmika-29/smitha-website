import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductService } from '../../services/product.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="cta" #ctaSection>
      <div class="cta-background">
        <div class="bg-pattern"></div>
        <div class="floating-element el-1"></div>
        <div class="floating-element el-2"></div>
        <div class="floating-element el-3"></div>
      </div>
      
      <div class="container">
        <div class="cta-content" #ctaContent>
          <span class="section-tag">Transform Your Hair</span>
          <h2 class="heading-display heading-lg">Your Hair Deserves Better</h2>
          <p class="body-lg">
            Switch to natural care and experience the difference from the first wash. 
            Pure ingredients, powerful results.
          </p>
          
          <div class="cta-actions">
            <button class="btn btn-accent btn-large">
              Buy Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button class="btn btn-outline-light btn-large">
              Learn More
            </button>
          </div>
          
          <div class="guarantee">
            <div class="guarantee-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div class="guarantee-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span>Free Shipping Over $50</span>
            </div>
            <div class="guarantee-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
        
        <div class="cta-product" #ctaProduct>
          <div class="product-card">
            <div class="product-badge">Best Seller</div>
            <img 
              [src]="product.image" 
              [alt]="product.name"
              class="product-image"
            />
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <div class="product-rating">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg width="14" height="14" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-accent)"/>
                  </svg>
                }
                <span>4.9 (2,847 reviews)</span>
              </div>
              <div class="product-price">
                <span class="price-original" *ngIf="product.salePrice">{{ product.price | currency }}</span>
                <span class="price-sale">{{ (product.salePrice || product.price) | currency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta {
      position: relative;
      padding: var(--space-xl) 0;
      background-color: var(--color-primary);
      overflow: hidden;
    }
    
    .cta-background {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .bg-pattern {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(248, 245, 240, 0.03) 1px, transparent 1px);
      background-size: 30px 30px;
    }
    
    .floating-element {
      position: absolute;
      border-radius: 50%;
      background: rgba(var(--color-accent-rgb), 0.1);
      
      &.el-1 {
        width: 400px;
        height: 400px;
        top: -100px;
        left: -100px;
        animation: float 15s ease-in-out infinite;
      }
      
      &.el-2 {
        width: 300px;
        height: 300px;
        bottom: -50px;
        right: -50px;
        animation: float 12s ease-in-out infinite reverse;
      }
      
      &.el-3 {
        width: 150px;
        height: 150px;
        top: 50%;
        left: 60%;
        animation: float 10s ease-in-out infinite 2s;
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, 30px); }
    }
    
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .cta-content {
      color: var(--color-cream);
      
      .section-tag {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(var(--color-accent-rgb), 0.2);
        border-radius: 2rem;
      }
      
      h2 {
        margin-bottom: 1.5rem;
      }
      
      > p {
        opacity: 0.9;
        margin-bottom: 2.5rem;
        max-width: 450px;
      }
    }
    
    .cta-actions {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .btn-large {
      padding: 1.25rem 2.5rem;
      font-size: 0.9rem;
    }
    
    .offer-timer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--color-accent);
      
      svg {
        animation: pulse 2s ease-in-out infinite;
      }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .guarantee {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }
    
    .guarantee-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--color-cream);
      opacity: 0.8;
      
      svg {
        color: var(--color-accent);
      }
    }
    
    .cta-product {
      display: flex;
      justify-content: center;
    }
    
    .product-card {
      position: relative;
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
      max-width: 320px;
      transition: transform 0.4s ease;
      
      &:hover {
        transform: translateY(-10px);
      }
    }
    
    .product-badge {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: var(--color-accent);
      color: var(--color-primary-dark);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
    }
    
    .product-card .product-image {
      width: 100%;
      height: 280px;
      object-fit: contain;
      margin-bottom: 1.5rem;
    }
    
    .product-info {
      text-align: center;
      
      h3 {
        font-family: var(--font-heading);
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: 0.75rem;
      }
    }
    
    .product-rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      margin-bottom: 1rem;
      
      span {
        margin-left: 0.5rem;
        font-size: 0.8rem;
        color: var(--color-charcoal-light);
      }
    }
    
    .product-price {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      
      .price-original {
        font-size: 1rem;
        color: var(--color-charcoal-light);
        text-decoration: line-through;
      }
      
      .price-sale {
        font-family: var(--font-heading);
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-primary);
      }
    }
    
    @media (max-width: 1024px) {
      .container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .cta-content > p {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      
      .cta-actions {
        flex-direction: column;
        gap: 1rem;
      }
      
      .guarantee {
        justify-content: center;
      }
      
      .cta-product {
        order: -1;
        margin-bottom: 2rem;
      }
    }
  `]
})
export class CtaSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ctaSection') ctaSection!: ElementRef;
  @ViewChild('ctaContent') ctaContent!: ElementRef;
  @ViewChild('ctaProduct') ctaProduct!: ElementRef;

  private productService = inject(ProductService);
  product = this.productService.products()[1]; // Use Nature's Therapy Hair Wash

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
      trigger: this.ctaContent.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.ctaContent.nativeElement.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(contentST);

    // Product animation
    const productST = ScrollTrigger.create({
      trigger: this.ctaProduct.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(this.ctaProduct.nativeElement.querySelector('.product-card'), {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      }
    });
    this.scrollTriggers.push(productST);
  }
}
