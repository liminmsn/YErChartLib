export abstract class Chart {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  
  constructor(container: HTMLElement | string) {
    if (typeof container === 'string') {
      const element = document.querySelector(container);
      if (!element) throw new Error(`Container ${container} not found`);
      container = element as HTMLElement;
    }
    
    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
  }
  
  abstract render(): void;
  
  destroy() {
    this.canvas.parentNode?.removeChild(this.canvas);
  }
}