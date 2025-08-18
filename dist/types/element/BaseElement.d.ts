export interface IChartElement {
    x: number;
    y: number;
    width: number;
    height: number;
    selected: boolean;
    draw(ctx: CanvasRenderingContext2D): void;
    contains(x: number, y: number): boolean;
}
export declare abstract class BaseElement implements IChartElement {
    x: number;
    y: number;
    width: number;
    height: number;
    strokeColor: string;
    strokeWidth: number;
    strokeDash: number[];
    selected: boolean;
    constructor(x: number, y: number, width: number, height: number, strokeColor?: string, strokeWidth?: number, strokeDash?: number[]);
    abstract drawContent(ctx: CanvasRenderingContext2D): void;
    draw(ctx: CanvasRenderingContext2D): void;
    contains(x: number, y: number): boolean;
}
export declare class RectElement extends BaseElement {
    color: string;
    constructor(x: number, y: number, width: number, height: number, color?: string);
    drawContent(ctx: CanvasRenderingContext2D): void;
}
export declare class CircleElement extends BaseElement {
    radius: number;
    color: string;
    constructor(x: number, y: number, radius: number, color?: string);
    drawContent(ctx: CanvasRenderingContext2D): void;
    contains(x: number, y: number): boolean;
}
//# sourceMappingURL=BaseElement.d.ts.map