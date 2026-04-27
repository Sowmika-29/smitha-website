import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ProductShowcaseComponent } from './components/product-showcase/product-showcase.component';
import { Product3dShowcaseComponent } from './components/product-3d-showcase/product-3d-showcase.component';
import { Global3dBackgroundComponent } from './components/global-3d-background/global-3d-background.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { IngredientsParallaxComponent } from './components/ingredients-parallax/ingredients-parallax.component';
import { BenefitsSectionComponent } from './components/benefits-section/benefits-section.component';
import { CleanPromiseComponent } from './components/clean-promise/clean-promise.component';
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
    Global3dBackgroundComponent,
    HeroSectionComponent,
    Product3dShowcaseComponent,
    ProductShowcaseComponent,
    AboutSectionComponent,
    IngredientsParallaxComponent,
    BenefitsSectionComponent,
    CleanPromiseComponent,
    TestimonialsSectionComponent,
    CtaSectionComponent,
    FooterComponent
  ],
  template: `
    <app-loading-screen />
    <app-global-3d-background />
    <app-navbar />
    <main>
      <app-hero-section />
      <app-product-3d-showcase />
      <app-about-section />
      <app-ingredients-parallax />
      <app-benefits-section />
      <app-product-showcase />
      <app-clean-promise />
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
      z-index: 1;
    }

    /* Make sections semi-transparent to show 3D background */
    app-hero-section, 
    app-about-section,
    app-benefits-section,
    app-clean-promise,
    app-testimonials-section,
    app-cta-section {
      display: block;
      background: transparent !important;
    }
  `]
})
export class AppComponent {}
