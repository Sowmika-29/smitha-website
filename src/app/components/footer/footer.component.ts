import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <a href="#" class="logo">
              <img src="assets/images/logo.png" alt="Smitha Pure Life" class="logo-image" />
              <span class="logo-text">Smitha Pure Life</span>
            </a>
            <p class="brand-description">
              Rooted in nature. Powered by tradition. Premium Ayurvedic hair care 
              products crafted for naturally beautiful hair.
            </p>
            <div class="social-links">
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="footer-links">
            <div class="link-group">
              <h4>Shop</h4>
              <ul>
                <li><a href="#">All Products</a></li>
                <li><a href="#">Hair Powder</a></li>
                <li><a href="#">Hair Oil</a></li>
                <li><a href="#">Gift Sets</a></li>
              </ul>
            </div>
            
            <div class="link-group">
              <h4>Learn</h4>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Ingredients</a></li>
                <li><a href="#">How to Use</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div class="link-group">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-newsletter">
            <h4>Join Our Community</h4>
            <p>Subscribe for exclusive offers, hair care tips, and 10% off your first order.</p>
            <form class="newsletter-form" (submit)="$event.preventDefault()">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" class="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            <p>&copy; 2026 Smitha Pure Life. All rights reserved.</p>
          </div>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div class="payment-methods">
            <span>Secure payments:</span>
            <div class="payment-icons">
              <svg width="32" height="20" viewBox="0 0 32 20"><rect fill="#1a1f71" width="32" height="20" rx="2"/><text x="16" y="14" fill="white" font-size="8" text-anchor="middle">VISA</text></svg>
              <svg width="32" height="20" viewBox="0 0 32 20"><rect fill="#eb001b" width="32" height="20" rx="2"/><circle cx="12" cy="10" r="6" fill="#eb001b"/><circle cx="20" cy="10" r="6" fill="#f79e1b"/><path d="M16 5a6 6 0 0 0 0 10 6 6 0 0 0 0-10" fill="#ff5f00"/></svg>
              <svg width="32" height="20" viewBox="0 0 32 20"><rect fill="#000" width="32" height="20" rx="2"/><text x="16" y="14" fill="white" font-size="6" text-anchor="middle">AMEX</text></svg>
              <svg width="32" height="20" viewBox="0 0 32 20"><rect fill="#003087" width="32" height="20" rx="2"/><text x="16" y="14" fill="white" font-size="6" text-anchor="middle">PayPal</text></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-primary-dark);
      color: var(--color-cream);
      padding: var(--space-lg) 0 var(--space-md);
    }
    
    .footer-main {
      display: grid;
      grid-template-columns: 1.5fr 2fr 1.5fr;
      gap: var(--space-lg);
      padding-bottom: var(--space-md);
      border-bottom: 1px solid rgba(248, 245, 240, 0.1);
      margin-bottom: var(--space-md);
    }
    
    .footer-brand {
      .logo {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: var(--color-cream);
        margin-bottom: 1rem;
        border: none;
        outline: none;
      }
      
      .logo-image {
        height: 40px;
        width: auto;
        object-fit: contain;
        border: none;
        outline: none;
      }
      
      .logo-text {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      
      .brand-description {
        font-size: 0.875rem;
        line-height: 1.7;
        opacity: 0.8;
        margin-bottom: 1.5rem;
      }
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      
      a {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(248, 245, 240, 0.1);
        border-radius: 50%;
        color: var(--color-cream);
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--color-accent);
          color: var(--color-primary-dark);
          transform: translateY(-3px);
        }
      }
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .link-group {
      h4 {
        font-family: var(--font-heading);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1.25rem;
        color: var(--color-accent);
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      li {
        margin-bottom: 0.75rem;
      }
      
      a {
        font-size: 0.875rem;
        color: var(--color-cream);
        text-decoration: none;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        
        &:hover {
          opacity: 1;
        }
      }
    }
    
    .footer-newsletter {
      h4 {
        font-family: var(--font-heading);
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      
      p {
        font-size: 0.875rem;
        opacity: 0.8;
        margin-bottom: 1.25rem;
      }
    }
    
    .newsletter-form {
      display: flex;
      gap: 0.5rem;
      
      input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid rgba(248, 245, 240, 0.2);
        border-radius: 8px;
        background: rgba(248, 245, 240, 0.05);
        color: var(--color-cream);
        font-size: 0.875rem;
        
        &::placeholder {
          color: rgba(248, 245, 240, 0.5);
        }
        
        &:focus {
          outline: none;
          border-color: var(--color-accent);
        }
      }
      
      .btn {
        padding: 0.75rem 1.5rem;
        white-space: nowrap;
      }
    }
    
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .copyright p {
      font-size: 0.8rem;
      opacity: 0.6;
      margin: 0;
    }
    
    .legal-links {
      display: flex;
      gap: 1.5rem;
      
      a {
        font-size: 0.8rem;
        color: var(--color-cream);
        text-decoration: none;
        opacity: 0.6;
        transition: opacity 0.3s ease;
        
        &:hover {
          opacity: 1;
        }
      }
    }
    
    .payment-methods {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      span {
        font-size: 0.8rem;
        opacity: 0.6;
      }
    }
    
    .payment-icons {
      display: flex;
      gap: 0.5rem;
    }
    
    @media (max-width: 1024px) {
      .footer-main {
        grid-template-columns: 1fr;
        gap: var(--space-md);
      }
      
      .footer-links {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
      
      .newsletter-form {
        flex-direction: column;
      }
    }
  `]
})
export class FooterComponent {}
