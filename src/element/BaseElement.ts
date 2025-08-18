// src/core/types.ts
export interface IChartElement {
    x: number;
    y: number;
    width: number;
    height: number;
    selected: boolean;
    draw(ctx: CanvasRenderingContext2D): void;
    contains(x: number, y: number): boolean;
}

export abstract class BaseElement implements IChartElement {
    selected = false;
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public strokeColor: string = '#ff0000',
        public strokeWidth: number = 2,
        public strokeDash: number[] = [] // 虚线模式
    ) { }

    abstract drawContent(ctx: CanvasRenderingContext2D): void;

    draw(ctx: CanvasRenderingContext2D) {
        this.drawContent(ctx);
    }

    contains(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }
}

//方形
export class RectElement extends BaseElement {
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        public color: string = '#3498db'
    ) {
        super(x, y, width, height);
    }

    drawContent(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 圆形
export class CircleElement extends BaseElement {
    constructor(
        x: number,
        y: number,
        public radius: number,
        public color: string = '#e74c3c'
    ) {
        super(x, y, radius * 2, radius * 2);
    }

    drawContent(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.x + this.radius,
            this.y + this.radius,
            this.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    contains(x: number, y: number): boolean {
        const dx = x - (this.x + this.radius);
        const dy = y - (this.y + this.radius);
        return dx * dx + dy * dy <= this.radius * this.radius;
    }
}