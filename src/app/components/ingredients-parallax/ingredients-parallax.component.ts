import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Ingredient {
  name: string;
  description: string;
  benefit: string;
  image: string;
}

@Component({
  selector: 'app-ingredients-parallax',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="ingredients" id="ingredients" #ingredientsSection>
      <div class="ingredients-header container" #header>
        <span class="section-tag">Key Ingredients</span>
        <h2 class="heading-display heading-lg">Powered by Nature</h2>
        <p class="section-intro body-lg">
          Each ingredient is carefully selected from traditional Ayurvedic recipes, 
          creating a synergistic blend that transforms your hair naturally.
        </p>
      </div>
      
      <div class="ingredients-grid">
        @for (ingredient of ingredients; track ingredient.name; let i = $index) {
          <div 
            class="ingredient-card" 
            #ingredientCard
            [style.--delay]="i * 0.1 + 's'"
          >
            <div class="card-image-wrapper">
              <img [src]="ingredient.image" [alt]="ingredient.name" class="card-image" />
              <div class="card-overlay"></div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ ingredient.name }}</h3>
              <p class="card-description">{{ ingredient.description }}</p>
              <div class="card-benefit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>{{ ingredient.benefit }}</span>
              </div>
            </div>
          </div>
        }
      </div>
      
      <div class="ingredients-cta container">
        <div class="cta-content" #ctaContent>
          <h3 class="heading-display heading-md">See the Full Ingredient List</h3>
          <p>Transparency is our promise. Every ingredient is listed, sourced ethically, and tested for purity.</p>
          <button class="btn btn-outline">View All Ingredients</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ingredients {
      padding: var(--space-xl) 0;
      background-color: transparent;
      overflow: hidden;
      perspective: 1500px;
    }
    
    .ingredients-header {
      text-align: center;
      margin-bottom: var(--space-lg);
      transform: translateZ(50px);
    }
    
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
    
    .section-intro {
      max-width: 600px;
      margin: 0 auto;
      color: var(--color-charcoal-light);
    }
    
    .ingredients-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      margin-bottom: var(--space-lg);
      transform-style: preserve-3d;
    }
    
    .ingredient-card {
      position: relative;
      aspect-ratio: 3/4;
      overflow: visible;
      cursor: pointer;
      perspective: 1000px;
      transform-style: preserve-3d;
      
      &:hover {
        .card-image {
          transform: scale(1.1);
        }
        
        .card-overlay {
          opacity: 0.7;
        }
        
        .card-content {
          transform: translateY(0) translateZ(50px);
        }
        
        .card-description,
        .card-benefit {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
    
    .card-image-wrapper {
      position: absolute;
      inset: 0;
      overflow: hidden;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }
    
    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s var(--transition-smooth);
    }
    
    .card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(26, 58, 47, 0.4) 60%,
        rgba(26, 58, 47, 0.9) 100%
      );
      opacity: 0.5;
      transition: opacity 0.4s ease;
    }
    
    .card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem;
      color: var(--color-cream);
      transform: translateY(40px) translateZ(20px);
      transition: transform 0.4s var(--transition-smooth);
      transform-style: preserve-3d;
      pointer-events: none;
    }
    
    .card-title {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    
    .card-description {
      font-size: 0.875rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.4s ease 0.1s;
    }
    
    .card-benefit {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      color: var(--color-accent);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.4s ease 0.2s;
    }
    
    .ingredients-cta {
      text-align: center;
      padding-top: var(--space-md);
    }
    
    .cta-content {
      max-width: 500px;
      margin: 0 auto;
      
      h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
      }
      
      p {
        color: var(--color-charcoal-light);
        margin-bottom: 2rem;
      }
    }
    
    @media (max-width: 1024px) {
      .ingredients-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .ingredients-grid {
        grid-template-columns: 1fr;
      }
      
      .ingredient-card {
        aspect-ratio: 4/3;
      }
      
      .card-content {
        transform: translateY(0);
      }
      
      .card-description,
      .card-benefit {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class IngredientsParallaxComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ingredientsSection') ingredientsSection!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('ctaContent') ctaContent!: ElementRef;
  @ViewChildren('ingredientCard') ingredientCards!: QueryList<ElementRef>;

  ingredients: Ingredient[] = [
    {
      name: 'Hibiscus',
      description: 'Strengthens hair, promotes growth, and adds natural shine. Rich in vitamins and antioxidants.',
      benefit: 'Strengthens & adds shine',
      image: 'https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=600&h=800&fit=crop'
    },
    {
      name: 'Shikakai',
      description: 'A gentle natural cleanser that improves scalp health and reduces hair fall without stripping natural oils.',
      benefit: 'Gentle natural cleanser',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=800&fit=crop'
    },
    {
      name: 'Herbal Powder Blend',
      description: 'A powerful mix of traditional herbs that detoxify, nourish, and protect your hair from damage.',
      benefit: 'Detoxify & protect',
      image: 'https://images.unsplash.com/photo-1523293915678-d126868e96f1?w=600&h=800&fit=crop'
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
    this.ingredientCards.forEach(card => {
      const element = card.nativeElement;
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(element.querySelector('.card-image-wrapper'), {
          rotationY: x * 15,
          rotationX: -y * 15,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out'
        });

        gsap.to(element.querySelector('.card-content'), {
          x: x * 20,
          y: y * 20,
          z: 50,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element.querySelector('.card-image-wrapper'), {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        });

        gsap.to(element.querySelector('.card-content'), {
          x: 0,
          y: 0,
          z: 0,
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
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Cards animation
    this.ingredientCards.forEach((card, index) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 85%',
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

      // Set initial state
      gsap.set(card.nativeElement, { opacity: 0, y: 50 });
    });

    // CTA animation
    gsap.from(this.ctaContent.nativeElement.children, {
      scrollTrigger: {
        trigger: this.ctaContent.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
}
