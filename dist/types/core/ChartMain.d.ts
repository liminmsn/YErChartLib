import { BaseElement } from "../element/types";
import { Chart } from "./Chart";
export declare class ChartMain extends Chart {
    private elements;
    constructor(dom: HTMLElement | string);
    render(): void;
    init(): void;
    private selectedElement;
    private isDragging;
    private dragOffsetX;
    private dragOffsetY;
    addElement(element: BaseElement): void;
    private renderRequested;
    requestRender(): void;
    private initCanvasEvents;
    private getMousePos;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
}
