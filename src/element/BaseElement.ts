import { BaseElement } from "./types";

// src/core/types.ts
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