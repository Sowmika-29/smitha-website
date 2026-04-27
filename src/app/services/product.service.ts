import { Injectable, signal } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  tagline: string;
  benefits: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = signal<Product[]>([
    {
      id: 'avosilk-conditioner',
      name: 'Avosilk Bloom Conditioner',
      tagline: 'Avocado Rich Formula',
      description: 'Restores natural strength and shine with the power of avocado and traditional herbs.',
      price: 49.99,
      salePrice: 39.99,
      image: 'assets/images/conditioner-bottle.png',
      benefits: ['Restores Shine', 'Strengthens Roots', 'Deep Hydration']
    },
    {
      id: 'hair-wash-powder',
      name: 'Nature\'s Therapy Hair Wash',
      tagline: 'Stronger Hair in 24 Washes',
      description: 'A potent Ayurvedic blend of hibiscus and shikakai for deep cleansing and nourishment.',
      price: 34.99,
      image: 'assets/images/hair-wash-powder.jpeg',
      benefits: ['100% Natural', 'Chemical Free', 'Scalp Health']
    },
    {
      id: 'follicra-serum',
      name: 'Follicra Regrowth Serum',
      tagline: 'Rooted in Nature',
      description: 'Powerful hair regrowth serum with 15 potent botanical extracts for thicker, fuller hair.',
      price: 59.99,
      salePrice: 44.99,
      image: 'assets/images/follicra-serum.jpeg',
      benefits: ['Promotes Growth', 'Reduces Fall', 'Thicker Strands']
    },
    {
      id: 'silk-gloss-serum',
      name: 'Silk Gloss Pro Repair',
      tagline: '100% Natural Oils',
      description: 'Instantly repair damage and add a brilliant silk-like gloss to your hair.',
      price: 39.99,
      image: 'assets/images/silk-gloss-serum.jpeg',
      benefits: ['Instant Shine', 'Heat Protection', 'Frizz Control']
    },
    {
      id: 'herbal-radiance-oil',
      name: 'Herbal Radiance Hair Oil',
      tagline: 'Rescue Your Hair in 3 Months',
      description: 'Traditional Ayurvedic oil infused with 35 potent herbs for ultimate hair transformation.',
      price: 54.99,
      image: 'assets/images/herbal-radiance-oil.jpeg',
      benefits: ['Intensive Repair', 'Longer Hair', 'Anti-Dandruff']
    }
  ]);
}
