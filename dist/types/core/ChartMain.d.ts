import { BaseElement } from "../element/types";
import { Chart } from "./Chart";
export declare class ChartMain extends Chart {
    private elements;
    private selectedElement;
    private isDragging;
    private dragOffsetX;
    private dragOffsetY;
    constructor(dom: HTMLElement | string);
    init(): void;
    addElement(element: BaseElement): void;
    render(): void;
    private renderRequested;
    requestRender(): void;
    private initCanvasEvents;
    private getMousePos;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
}
