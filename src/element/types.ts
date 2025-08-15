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

        // 如果选中则绘制描边
        if (this.selected) {
            ctx.save(); // 保存当前绘图状态
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;
            ctx.setLineDash(this.strokeDash);

            // 使用路径绘制代替 strokeRect
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.restore(); // 恢复绘图状态
        }
    }

    contains(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }
}