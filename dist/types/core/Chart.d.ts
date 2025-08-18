export declare abstract class Chart {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected scale: number;
    protected scaleStep: number;
    protected maxScale: number;
    protected minScale: number;
    private scrollHandler;
    constructor(container: HTMLElement | string);
    abstract render(): void;
    protected handleScroll(e: WheelEvent): void;
    protected applyTransform(): void;
    destroy(): void;
}
//# sourceMappingURL=Chart.d.ts.map