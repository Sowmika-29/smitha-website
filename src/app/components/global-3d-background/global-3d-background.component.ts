import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';

@Component({
  selector: 'app-global-3d-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="canvas-container" #container>
      <canvas #canvas></canvas>
    </div>
  `,
  styles: [`
    .canvas-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
      background: var(--color-cream);
      
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');
        opacity: 0.1;
        pointer-events: none;
      }
    }
    
    canvas {
      width: 100%;
      height: 100%;
      display: block;
      filter: blur(3px); // Subtle depth blur
    }
  `]
})
export class Global3dBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private points!: THREE.Points;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
      window.addEventListener('resize', this.onResize.bind(this));
    });
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('resize', this.onResize.bind(this));
    this.renderer.dispose();
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a field of "organic" particles
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const color1 = new THREE.Color(0x9ab973); // Olivine
    const color2 = new THREE.Color(0x1a3a2f); // Deep Green
    const color3 = new THREE.Color(0xfaf8f5); // Cream

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      if (Math.random() > 0.8) mixedColor.lerp(color3, 0.5);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    // Add some soft 3D shapes (leaves/petals)
    this.addFloatingShapes();
  }

  private addFloatingShapes(): void {
    const shapeCount = 15;
    const geometry = new THREE.IcosahedronGeometry(0.1, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x9ab973, 
      transparent: true, 
      opacity: 0.2,
      wireframe: true 
    });

    for (let i = 0; i < shapeCount; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );
      mesh.userData = {
        speed: 0.002 + Math.random() * 0.005,
        rotationSpeed: 0.01 + Math.random() * 0.02
      };
      this.scene.add(mesh);
    }
  }

  private onMouseMove(event: MouseEvent): void {
    this.targetX = (event.clientX / window.innerWidth - 0.5) * 0.5;
    this.targetY = (event.clientY / window.innerHeight - 0.5) * 0.5;
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    this.mouseX += (this.targetX - this.mouseX) * 0.05;
    this.mouseY += (this.targetY - this.mouseY) * 0.05;

    this.points.rotation.y += 0.001 + this.mouseX * 0.01;
    this.points.rotation.x += 0.001 + this.mouseY * 0.01;

    const scrollY = window.scrollY;
    this.points.position.y = scrollY * 0.001;

    // Animate shapes
    this.scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x += child.userData['rotationSpeed'];
        child.rotation.y += child.userData['rotationSpeed'];
        child.position.y += Math.sin(Date.now() * child.userData['speed']) * 0.002;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}
