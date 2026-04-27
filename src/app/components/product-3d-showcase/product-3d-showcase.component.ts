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
            <span class="panel-tag">Premium Care</span>
            <h2 class="heading-display heading-lg">Naturally Nourishing</h2>
            <p class="body-lg">
              Our Avosilk formula combines the power of pure Avocado extracts 
              with 15 rare Ayurvedic herbs to deeply condition every strand.
            </p>
          </div>
          
          <div class="panel panel-texture" #panelTexture>
            <span class="panel-tag">Silky Finish</span>
            <h2 class="heading-display heading-lg">Weightless Hydration</h2>
            <p class="body-lg">
              Experience a silky-smooth texture that absorbs instantly, 
              providing deep hydration without any oily residue or heaviness.
            </p>
          </div>
          
          <div class="panel panel-packaging" #panelPackaging>
            <span class="panel-tag">Eco-Conscious</span>
            <h2 class="heading-display heading-lg">Mindfully Packaged</h2>
            <p class="body-lg">
              Our sleek, ergonomic bottles are designed for elegance and 
              sustainability, using 100% recyclable materials to protect our planet.
            </p>
          </div>
          
          <div class="panel panel-final" #panelFinal>
            <span class="panel-tag">Transform Your Hair</span>
            <h2 class="heading-display heading-lg">Radiance Redefined</h2>
            <p class="body-lg">
              Unlock the secret to naturally glowing, manageable hair. 
              Your journey to pure herbal excellence begins with every wash.
            </p>
            <button class="btn btn-accent">Order Now</button>
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
      background: transparent;
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
      background: rgba(var(--color-accent-rgb), 0.15);
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
  
  // Frame Sequence Assets
  private totalFrames = 67;
  private textures: THREE.Texture[] = [];
  private currentFrame = 0;
  private bottleMesh!: THREE.Mesh;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.preloadFrames().then(() => {
      this.ngZone.runOutsideAngular(() => {
        this.initThree();
        this.initScrollAnimations();
        this.animate();
      });
    });
  }

  private async preloadFrames(): Promise<void> {
    const loader = new THREE.TextureLoader();
    const loadPromises = [];

    for (let i = 1; i <= this.totalFrames; i++) {
      const frameNum = i.toString().padStart(3, '0');
      const url = `assets/images/3d-frames/ezgif-frame-${frameNum}.jpg`;
      loadPromises.push(
        new Promise<THREE.Texture>((resolve) => {
          loader.load(url, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            resolve(texture);
          });
        })
      );
    }

    this.textures = await Promise.all(loadPromises);
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
    this.textures.forEach(t => t.dispose());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initThree(): void {
    const canvas = this.threeCanvas.nativeElement;
    const wrapper = this.canvasWrapper.nativeElement;

    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(
      45,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.localClippingEnabled = true; // Enable clipping

    this.productGroup = new THREE.Group();
    this.scene.add(this.productGroup);

    this.createProductJar();

    // Lighting (Subtle, as images are pre-lit)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    window.addEventListener('resize', () => this.onResize());
  }

  private createProductJar(): void {
    const geometry = new THREE.PlaneGeometry(3.2, 3.2);
    
    // Clipping plane to remove bottom watermark (Veo)
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.4); 

    const material = new THREE.MeshBasicMaterial({
      map: this.textures[0],
      transparent: true,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane]
    });
    
    this.bottleMesh = new THREE.Mesh(geometry, material);
    this.bottleMesh.name = 'bottle';
    this.productGroup.add(this.bottleMesh);

    // Shadow
    const shadowGeo = new THREE.CircleGeometry(0.8, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.name = 'shadow';
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = -1.6;
    shadowMesh.position.z = -0.2;
    shadowMesh.scale.y = 0.3;
    this.productGroup.add(shadowMesh);

    this.createParticles();
  }

  private createParticles(): void {
    const particleCount = 40;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x9ab973,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
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

    gsap.set(panels, { opacity: 0, y: 50 });
    gsap.set(panels[0], { opacity: 1, y: 0 });

    this.scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // Smoother frame transitions
      onUpdate: (self) => {
        const progress = self.progress;
        
        // 1. Update Frame Sequence
        const frameIndex = Math.min(
          this.totalFrames - 1,
          Math.floor(progress * this.totalFrames)
        );
        
        if (this.bottleMesh && this.textures[frameIndex]) {
          (this.bottleMesh.material as THREE.MeshBasicMaterial).map = this.textures[frameIndex];
        }

        // 2. Subtle Float & Scale
        if (this.productGroup) {
          this.productGroup.position.y = Math.sin(progress * Math.PI * 2) * 0.1;
          this.productGroup.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.03);

          const shadow = this.productGroup.getObjectByName('shadow') as THREE.Mesh;
          if (shadow) {
            (shadow.material as THREE.MeshBasicMaterial).opacity = 0.15 + (Math.sin(progress * Math.PI) * 0.05);
          }
        }
        
        // 3. UI and Progress
        gsap.to(progressFill, { height: `${progress * 100}%`, duration: 0.1 });
        
        const panelIndex = Math.floor(progress * 4);
        panels.forEach((panel, i) => {
          if (i === panelIndex) {
            gsap.to(panel, { opacity: 1, y: 0, duration: 0.3 });
          } else {
            gsap.to(panel, { opacity: 0, y: i < panelIndex ? -30 : 30, duration: 0.3 });
          }
        });
        
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
    
    if (this.productGroup) {
      this.productGroup.position.y += Math.cos(Date.now() * 0.001) * 0.0003;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
