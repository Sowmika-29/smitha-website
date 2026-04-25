import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { Product3dShowcaseComponent } from './components/product-3d-showcase/product-3d-showcase.component';
import { IngredientsParallaxComponent } from './components/ingredients-parallax/ingredients-parallax.component';
import { BenefitsSectionComponent } from './components/benefits-section/benefits-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    LoadingScreenComponent,
    HeroSectionComponent,
    Product3dShowcaseComponent,
    IngredientsParallaxComponent,
    BenefitsSectionComponent,
    TestimonialsSectionComponent,
    CtaSectionComponent,
    FooterComponent
  ],
  template: `
    <app-loading-screen />
    <app-navbar />
    <main>
      <app-hero-section />
      <app-product-3d-showcase />
      <app-ingredients-parallax />
      <app-benefits-section />
      <app-testimonials-section />
      <app-cta-section />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
    }
    
    main {
      position: relative;
    }
  `]
})
export class AppComponent {}
