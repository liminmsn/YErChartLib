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
