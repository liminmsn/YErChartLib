export declare abstract class Chart {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    constructor(container: HTMLElement | string);
    abstract render(): void;
    destroy(): void;
}
