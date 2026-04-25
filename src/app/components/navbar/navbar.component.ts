import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()" [class.hidden]="isHidden()">
      <div class="navbar-container">
        <a href="#" class="logo">
          <img src="assets/images/smitha-logo.jpeg" alt="Smitha Pure Life" class="logo-image" />
          <span class="logo-text">Smitha Pure Life</span>
        </a>
        
        <div class="nav-links" [class.open]="menuOpen()">
          <a href="#products" class="nav-link">Products</a>
          <a href="#ingredients" class="nav-link">Ingredients</a>
          <a href="#benefits" class="nav-link">Benefits</a>
          <a href="#testimonials" class="nav-link">Reviews</a>
        </div>
        
        <div class="nav-actions">
          <button class="btn btn-accent">Shop Now</button>
          <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()">
            <span class="menu-line" [class.open]="menuOpen()"></span>
            <span class="menu-line" [class.open]="menuOpen()"></span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1.5rem 0;
      transition: all 0.4s var(--transition-smooth);
    }
    
    .navbar.scrolled {
      background-color: rgba(248, 245, 240, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 0;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    }
    
    .navbar.hidden {
      transform: translateY(-100%);
    }
    
    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--color-primary);
    }
    
    .logo-image {
      height: 40px;
      width: auto;
      object-fit: contain;
    }
    
    .logo-text {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    
    .nav-links {
      display: flex;
      gap: 3rem;
    }
    
    .nav-link {
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-decoration: none;
      color: var(--color-charcoal);
      position: relative;
      padding: 0.25rem 0;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background-color: var(--color-accent);
        transition: width 0.3s ease;
      }
      
      &:hover::after {
        width: 100%;
      }
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .nav-actions .btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.75rem;
    }
    
    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      padding: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
    }
    
    .menu-line {
      width: 24px;
      height: 2px;
      background-color: var(--color-primary);
      transition: all 0.3s ease;
      
      &.open:first-child {
        transform: rotate(45deg) translate(3px, 3px);
      }
      
      &.open:last-child {
        transform: rotate(-45deg) translate(3px, -3px);
      }
    }
    
    @media (max-width: 900px) {
      .nav-links {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background-color: var(--color-cream);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        transform: translateY(-120%);
        opacity: 0;
        transition: all 0.4s ease;
        
        &.open {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .menu-toggle {
        display: flex;
      }
      
      .nav-actions .btn {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  isHidden = signal(false);
  menuOpen = signal(false);
  
  private lastScrollY = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScrollY = window.scrollY;
    
    this.isScrolled.set(currentScrollY > 50);
    
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.isHidden.set(true);
    } else {
      this.isHidden.set(false);
    }
    
    this.lastScrollY = currentScrollY;
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }
}
