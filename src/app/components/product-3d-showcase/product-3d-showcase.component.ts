import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-product-3d-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="showcase" id="product" #showcaseSection>
      <div class="showcase-background">
        <div class="bg-gradient"></div>
      </div>
      
      <div class="showcase-container">
        <div class="canvas-wrapper" #canvasWrapper>
          <canvas #threeCanvas></canvas>
          <div class="product-overlay">
            <div class="rotation-hint" #rotationHint>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>Scroll to rotate</span>
            </div>
          </div>
        </div>
        
        <div class="content-panels">
          <div class="panel panel-intro" #panelIntro>
            <span class="panel-tag">Premium Quality</span>
            <h2 class="heading-display heading-lg">Crafted with Care</h2>
            <p class="body-lg">
              Each jar contains the perfect blend of 15 potent herbs, 
              meticulously sourced from the foothills of the Himalayas.
            </p>
          </div>
          
          <div class="panel panel-texture" #panelTexture>
            <span class="panel-tag">Fine Texture</span>
            <h2 class="heading-display heading-lg">Silky Smooth Formula</h2>
            <p class="body-lg">
              Our micro-fine powder dissolves instantly, leaving no residue 
              while delivering maximum herbal benefits to every strand.
            </p>
          </div>
          
          <div class="panel panel-packaging" #panelPackaging>
            <span class="panel-tag">Eco-Friendly</span>
            <h2 class="heading-display heading-lg">Sustainable Packaging</h2>
            <p class="body-lg">
              Housed in recyclable glass jars with bamboo lids, our packaging 
              is as kind to the earth as our formula is to your hair.
            </p>
          </div>
          
          <div class="panel panel-final" #panelFinal>
            <span class="panel-tag">Your Journey Begins</span>
            <h2 class="heading-display heading-lg">Experience the Difference</h2>
            <p class="body-lg">
              Join thousands who have transformed their hair care routine 
              with the power of ancient Ayurvedic wisdom.
            </p>
            <button class="btn btn-accent">Shop Collection</button>
          </div>
        </div>
      </div>
      
      <div class="progress-bar" #progressBar>
        <div class="progress-fill"></div>
      </div>
    </section>
  `,
  styles: [`
    .showcase {
      position: relative;
      min-height: 400vh;
      background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 50%, var(--color-cream) 100%);
    }
    
    .showcase-background {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
    
    .bg-gradient {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 120%;
      height: 60%;
      background: radial-gradient(ellipse, rgba(26, 58, 47, 0.03) 0%, transparent 70%);
    }
    
    .showcase-container {
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .canvas-wrapper {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    
    .product-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 3rem;
    }
    
    .rotation-hint {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-charcoal-light);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.6;
      
      svg {
        animation: rotateHint 2s ease-in-out infinite;
      }
    }
    
    @keyframes rotateHint {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(10deg); }
      75% { transform: rotate(-10deg); }
    }
    
    .content-panels {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 500px;
      padding: 0 2rem;
      pointer-events: none;
    }
    
    .panel {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      pointer-events: auto;
      
      &.active {
        opacity: 1;
      }
    }
    
    .panel-tag {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(196, 163, 90, 0.15);
      border-radius: 2rem;
    }
    
    h2 {
      color: var(--color-primary);
      margin-bottom: 1.5rem;
    }
    
    .panel p {
      color: var(--color-charcoal-light);
      margin-bottom: 2rem;
    }
    
    .progress-bar {
      position: fixed;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      width: 3px;
      height: 200px;
      background: rgba(26, 58, 47, 0.1);
      border-radius: 2px;
      overflow: hidden;
      z-index: 100;
    }
    
    .progress-fill {
      width: 100%;
      height: 0%;
      background: var(--color-accent);
      border-radius: 2px;
      transition: height 0.1s ease;
    }
    
    @media (max-width: 1024px) {
      .content-panels {
        position: absolute;
        bottom: 10%;
        top: auto;
        transform: none;
        text-align: center;
      }
      
      .panel {
        position: relative;
        top: auto;
        transform: none;
      }
      
      .progress-bar {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      .showcase {
        min-height: 300vh;
      }
    }
  `]
})
export class Product3dShowcaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('showcaseSection') showcaseSection!: ElementRef;
  @ViewChild('canvasWrapper') canvasWrapper!: ElementRef;
  @ViewChild('threeCanvas') threeCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('panelIntro') panelIntro!: ElementRef;
  @ViewChild('panelTexture') panelTexture!: ElementRef;
  @ViewChild('panelPackaging') panelPackaging!: ElementRef;
  @ViewChild('panelFinal') panelFinal!: ElementRef;
  @ViewChild('rotationHint') rotationHint!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private productGroup!: THREE.Group;
  private animationId!: number;
  private scrollTrigger!: ScrollTrigger;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.initScrollAnimations();
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initThree(): void {
    const canvas = this.threeCanvas.nativeElement;
    const wrapper = this.canvasWrapper.nativeElement;

    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Product group
    this.productGroup = new THREE.Group();
    this.scene.add(this.productGroup);

    // Create jar geometry (cylindrical jar with lid)
    this.createProductJar();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xc4a35a, 0.4);
    directionalLight2.position.set(-5, 3, -5);
    this.scene.add(directionalLight2);

    // Handle resize
    window.addEventListener('resize', () => this.onResize());
  }

  private createProductJar(): void {
    // Main jar body (glass effect)
    const jarGeometry = new THREE.CylinderGeometry(0.8, 0.7, 2, 32);
    const jarMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfaf8f5,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const jar = new THREE.Mesh(jarGeometry, jarMaterial);
    this.productGroup.add(jar);

    // Jar contents (powder)
    const contentsGeometry = new THREE.CylinderGeometry(0.75, 0.65, 1.6, 32);
    const contentsMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a6b3a, // Herbal green
      roughness: 0.9,
      metalness: 0,
    });
    const contents = new THREE.Mesh(contentsGeometry, contentsMaterial);
    contents.position.y = -0.15;
    this.productGroup.add(contents);

    // Lid (bamboo-like)
    const lidGeometry = new THREE.CylinderGeometry(0.85, 0.85, 0.3, 32);
    const lidMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4a35a, // Golden bamboo
      roughness: 0.7,
      metalness: 0.1,
    });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.y = 1.15;
    this.productGroup.add(lid);

    // Lid top
    const lidTopGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32);
    const lidTop = new THREE.Mesh(lidTopGeometry, lidMaterial);
    lidTop.position.y = 1.35;
    this.productGroup.add(lidTop);

    // Label band
    const labelGeometry = new THREE.CylinderGeometry(0.81, 0.76, 0.8, 32, 1, true);
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a3a2f, // Deep green
      roughness: 0.4,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.y = 0.2;
    this.productGroup.add(label);

    // Add floating particles around jar
    this.createParticles();
  }

  private createParticles(): void {
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2 + Math.random() * 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = (Math.random() - 0.5) * 3;
      positions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xc4a35a,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    
    const particles = new THREE.Points(geometry, material);
    this.productGroup.add(particles);
  }

  private initScrollAnimations(): void {
    const section = this.showcaseSection.nativeElement;
    const panels = [
      this.panelIntro.nativeElement,
      this.panelTexture.nativeElement,
      this.panelPackaging.nativeElement,
      this.panelFinal.nativeElement
    ];
    const progressFill = this.progressBar.nativeElement.querySelector('.progress-fill');

    // Set initial states
    gsap.set(panels, { opacity: 0, y: 50 });
    gsap.set(panels[0], { opacity: 1, y: 0 });

    this.scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Update progress bar
        gsap.to(progressFill, { height: `${progress * 100}%`, duration: 0.1 });
        
        // Rotate product based on scroll
        if (this.productGroup) {
          this.productGroup.rotation.y = progress * Math.PI * 4;
          this.productGroup.position.y = Math.sin(progress * Math.PI * 2) * 0.3;
        }
        
        // Panel visibility
        const panelIndex = Math.floor(progress * 4);
        panels.forEach((panel, i) => {
          if (i === panelIndex) {
            gsap.to(panel, { opacity: 1, y: 0, duration: 0.3 });
          } else {
            gsap.to(panel, { opacity: 0, y: i < panelIndex ? -30 : 30, duration: 0.3 });
          }
        });
        
        // Hide rotation hint after initial scroll
        if (progress > 0.05) {
          gsap.to(this.rotationHint.nativeElement, { opacity: 0, duration: 0.3 });
        } else {
          gsap.to(this.rotationHint.nativeElement, { opacity: 0.6, duration: 0.3 });
        }
      }
    });
  }

  private onResize(): void {
    const wrapper = this.canvasWrapper.nativeElement;
    this.camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Subtle idle rotation
    if (this.productGroup) {
      this.productGroup.rotation.y += 0.001;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
