import { BaseElement } from "./types";
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
    draw(ctx: CanvasRenderingContext2D): void;
}
