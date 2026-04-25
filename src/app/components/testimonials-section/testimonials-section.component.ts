import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  beforeImage: string;
  afterImage: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials" id="testimonials" #testimonialsSection>
      <div class="container">
        <div class="testimonials-header" #header>
          <span class="section-tag">Customer Stories</span>
          <h2 class="heading-display heading-lg">Real Results, Real Stories</h2>
          <p class="body-lg">
            Join thousands of satisfied customers who have transformed their hair naturally.
          </p>
        </div>
        
        <div class="testimonials-carousel">
          <div class="carousel-track" #carouselTrack>
            @for (testimonial of testimonials; track testimonial.name; let i = $index) {
              <div 
                class="testimonial-card" 
                [class.active]="i === activeIndex()"
              >
                <div class="card-header">
                  <img [src]="testimonial.avatar" [alt]="testimonial.name" class="avatar" />
                  <div class="user-info">
                    <h4>{{ testimonial.name }}</h4>
                    <span>{{ testimonial.location }}</span>
                  </div>
                  <div class="rating">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        [class.filled]="star <= testimonial.rating"
                      >
                        <path 
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          [attr.fill]="star <= testimonial.rating ? '#c4a35a' : 'none'"
                          [attr.stroke]="star <= testimonial.rating ? '#c4a35a' : '#ccc'"
                          stroke-width="2"
                        />
                      </svg>
                    }
                  </div>
                </div>
                
                <blockquote class="testimonial-text">
                  "{{ testimonial.text }}"
                </blockquote>
                
                <div class="transformation">
                  <div class="transform-image">
                    <img [src]="testimonial.beforeImage" alt="Before" />
                    <span>Before</span>
                  </div>
                  <div class="transform-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <div class="transform-image">
                    <img [src]="testimonial.afterImage" alt="After" />
                    <span>After</span>
                  </div>
                </div>
              </div>
            }
          </div>
          
          <div class="carousel-controls">
            <button 
              class="control-btn prev" 
              (click)="prevSlide()"
              [disabled]="activeIndex() === 0"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div class="carousel-dots">
              @for (testimonial of testimonials; track testimonial.name; let i = $index) {
                <button 
                  class="dot" 
                  [class.active]="i === activeIndex()"
                  (click)="goToSlide(i)"
                  [attr.aria-label]="'Go to testimonial ' + (i + 1)"
                ></button>
              }
            </div>
            
            <button 
              class="control-btn next" 
              (click)="nextSlide()"
              [disabled]="activeIndex() === testimonials.length - 1"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="social-proof" #socialProof>
          <div class="proof-stat">
            <span class="number">4.9</span>
            <div class="stars">
              @for (star of [1,2,3,4,5]; track star) {
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#c4a35a"/>
                </svg>
              }
            </div>
            <span class="label">Average Rating</span>
          </div>
          <div class="proof-stat">
            <span class="number">50K+</span>
            <span class="label">Happy Customers</span>
          </div>
          <div class="proof-stat">
            <span class="number">15K+</span>
            <span class="label">5-Star Reviews</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      padding: var(--space-xl) 0;
      background-color: var(--color-cream);
      overflow: hidden;
    }
    
    .testimonials-header {
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
    
    .testimonials-carousel {
      max-width: 800px;
      margin: 0 auto var(--space-lg);
    }
    
    .carousel-track {
      display: flex;
      transition: transform 0.5s var(--transition-smooth);
    }
    
    .testimonial-card {
      flex: 0 0 100%;
      padding: 2rem;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      opacity: 0.5;
      transform: scale(0.95);
      transition: all 0.4s ease;
      
      &.active {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--color-accent);
    }
    
    .user-info {
      flex: 1;
      
      h4 {
        font-family: var(--font-heading);
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-primary);
      }
      
      span {
        font-size: 0.8rem;
        color: var(--color-charcoal-light);
      }
    }
    
    .rating {
      display: flex;
      gap: 0.25rem;
    }
    
    .testimonial-text {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-style: italic;
      color: var(--color-charcoal);
      line-height: 1.6;
      margin-bottom: 2rem;
      padding: 0;
      border: none;
    }
    
    .transformation {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(26, 58, 47, 0.1);
    }
    
    .transform-image {
      text-align: center;
      
      img {
        width: 120px;
        height: 120px;
        border-radius: 12px;
        object-fit: cover;
        margin-bottom: 0.5rem;
      }
      
      span {
        display: block;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-charcoal-light);
      }
    }
    
    .transform-arrow {
      color: var(--color-accent);
    }
    
    .carousel-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .control-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid var(--color-primary);
      background: transparent;
      color: var(--color-primary);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover:not(:disabled) {
        background: var(--color-primary);
        color: var(--color-cream);
      }
      
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
    
    .carousel-dots {
      display: flex;
      gap: 0.5rem;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background: rgba(26, 58, 47, 0.2);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background: var(--color-accent);
        transform: scale(1.2);
      }
      
      &:hover:not(.active) {
        background: rgba(26, 58, 47, 0.4);
      }
    }
    
    .social-proof {
      display: flex;
      justify-content: center;
      gap: 4rem;
      padding: 2rem;
      background: var(--color-primary);
      border-radius: 20px;
    }
    
    .proof-stat {
      text-align: center;
      color: var(--color-cream);
      
      .number {
        display: block;
        font-family: var(--font-heading);
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }
      
      .stars {
        display: flex;
        justify-content: center;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
      }
      
      .label {
        font-size: 0.8rem;
        letter-spacing: 0.05em;
        opacity: 0.8;
      }
    }
    
    @media (max-width: 768px) {
      .testimonial-card {
        padding: 1.5rem;
      }
      
      .testimonial-text {
        font-size: 1rem;
      }
      
      .transformation {
        flex-direction: row;
        gap: 1rem;
      }
      
      .transform-image img {
        width: 80px;
        height: 80px;
      }
      
      .social-proof {
        flex-direction: column;
        gap: 2rem;
      }
    }
  `]
})
export class TestimonialsSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('testimonialsSection') testimonialsSection!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  @ViewChild('socialProof') socialProof!: ElementRef;

  activeIndex = signal(0);

  testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      text: 'My hair feels softer and healthier within weeks. The shine is unbelievable! This is the best natural hair product I have ever used.',
      beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&h=200&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      location: 'Los Angeles, USA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Finally a natural product that actually works for hair fall. I was skeptical at first, but the results speak for themselves!',
      beforeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop'
    },
    {
      name: 'Aisha Patel',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      rating: 5,
      text: 'I love how light and nourishing it feels - no chemicals, just results. My scalp has never been healthier!',
      beforeImage: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88?w=200&h=200&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=200&h=200&fit=crop'
    }
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }

  prevSlide(): void {
    if (this.activeIndex() > 0) {
      this.activeIndex.update(v => v - 1);
      this.updateCarousel();
    }
  }

  nextSlide(): void {
    if (this.activeIndex() < this.testimonials.length - 1) {
      this.activeIndex.update(v => v + 1);
      this.updateCarousel();
    }
  }

  goToSlide(index: number): void {
    this.activeIndex.set(index);
    this.updateCarousel();
  }

  private updateCarousel(): void {
    gsap.to(this.carouselTrack.nativeElement, {
      x: `-${this.activeIndex() * 100}%`,
      duration: 0.5,
      ease: 'power2.out'
    });
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

    // Social proof animation
    const socialST = ScrollTrigger.create({
      trigger: this.socialProof.nativeElement,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(this.socialProof.nativeElement.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
    this.scrollTriggers.push(socialST);
  }
}
