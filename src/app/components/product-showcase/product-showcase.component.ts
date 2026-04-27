import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, inject, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductService, Product } from '../../services/product.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="product-showcase" id="products" #showcaseSection>
      <div class="container">
        <div class="showcase-header" #header>
          <span class="section-tag">Our Collection</span>
          <h2 class="heading-display heading-lg">Naturally Crafted for You</h2>
          <p class="body-lg">Explore our range of premium Ayurvedic hair care products.</p>
        </div>
        
        <div class="products-grid">
          @for (product of products(); track product.id; let i = $index) {
            <div 
              class="product-card" 
              #productCard
              [style.--delay]="i * 0.1 + 's'"
            >
              <div class="product-image-wrapper">
                <img [src]="product.image" [alt]="product.name" class="product-image" />
                <div class="product-overlay">
                  <button class="btn btn-primary btn-sm">Add to Cart</button>
                </div>
                @if (product.salePrice) {
                  <div class="sale-badge">Sale</div>
                }
              </div>
              <div class="product-details">
                <span class="product-tagline">{{ product.tagline }}</span>
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="product-price">
                  <span class="price-sale">{{ (product.salePrice || product.price) | currency }}</span>
                  <span class="price-original" *ngIf="product.salePrice">{{ product.price | currency }}</span>
                </div>
                <div class="product-benefits">
                  @for (benefit of product.benefits; track benefit) {
                    <span class="benefit-tag">{{ benefit }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .product-showcase {
      padding: var(--space-xl) 0;
      background-color: var(--color-cream-dark);
      overflow: hidden;
    }
    
    .showcase-header {
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
        margin-bottom: 1rem;
      }
      
      p {
        color: var(--color-charcoal-light);
        max-width: 500px;
        margin: 0 auto;
      }
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .product-card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      transition: all 0.4s var(--transition-smooth);
      position: relative;
      opacity: 0;
      transform: translateY(30px);
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        
        .product-image {
          transform: scale(1.05);
        }
        
        .product-overlay {
          opacity: 1;
        }
      }
    }
    
    .product-image-wrapper {
      position: relative;
      height: 350px;
      background: #f9f9f9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow: hidden;
    }
    
    .product-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.6s var(--transition-smooth);
    }
    
    .product-overlay {
      position: absolute;
      inset: 0;
      background: rgba(26, 58, 47, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(4px);
    }
    
    .sale-badge {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: #e74c3c;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .product-details {
      padding: 2rem;
      text-align: center;
    }
    
    .product-tagline {
      display: block;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-accent);
      margin-bottom: 0.5rem;
    }
    
    .product-name {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 1rem;
    }
    
    .product-price {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      .price-sale {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-primary);
      }
      
      .price-original {
        font-size: 0.9rem;
        color: var(--color-charcoal-light);
        text-decoration: line-through;
      }
    }
    
    .product-benefits {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .benefit-tag {
      font-size: 0.7rem;
      padding: 0.25rem 0.75rem;
      background: var(--color-cream);
      color: var(--color-charcoal);
      border-radius: 2rem;
      border: 1px solid rgba(26, 58, 47, 0.1);
    }
    
    @media (max-width: 1024px) {
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductShowcaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('showcaseSection') showcaseSection!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChildren('productCard') productCards!: QueryList<ElementRef>;

  private productService = inject(ProductService);
  products = this.productService.products;

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
      start: 'top 85%',
      onEnter: () => {
        gsap.from(this.header.nativeElement.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(headerST);

    // Cards animation
    this.productCards.forEach((card, index) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(card.nativeElement, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    });
  }
}
