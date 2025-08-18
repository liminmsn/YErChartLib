export abstract class Chart {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected scale: number = 1;
  protected scaleStep: number = 0.1;
  protected maxScale: number = 3;
  protected minScale: number = 0.5;
  private scrollHandler: (e: WheelEvent) => void;

  constructor(container: HTMLElement | string) {
    if (typeof container === 'string') {
      const element = document.querySelector(container);
      if (!element) throw new Error(`Container ${container} not found`);
      container = element as HTMLElement;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;

    // Initialize scroll handler
    this.scrollHandler = this.handleScroll.bind(this);
    this.canvas.addEventListener('wheel', this.scrollHandler, { passive: false });
  }

  abstract render(): void;

  protected handleScroll(e: WheelEvent) {
    e.preventDefault();
    
    // Determine zoom direction
    const delta = Math.sign(e.deltaY);
    
    // Calculate new scale
    let newScale = this.scale;
    if (delta > 0) {
      newScale = Math.max(this.scale - this.scaleStep, this.minScale);
    } else {
      newScale = Math.min(this.scale + this.scaleStep, this.maxScale);
    }
    
    // Only update if scale changed
    if (newScale !== this.scale) {
      this.scale = newScale;
      this.applyTransform();
      this.render(); // Re-render with new scale
    }
  }

  protected applyTransform() {
    // Reset transform
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Apply scale
    this.ctx.scale(this.scale, this.scale);
    
    // Optional: You might want to adjust the origin based on mouse position
    // For more advanced zoom-to-point functionality
  }

  destroy() {
    this.canvas.removeEventListener('wheel', this.scrollHandler);
    this.canvas.parentNode?.removeChild(this.canvas);
  }
}