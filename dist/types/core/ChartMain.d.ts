import { BaseElement } from "../element/BaseElement";
import { Chart } from "./Chart";
export declare class ChartMain extends Chart {
    private elements;
    constructor(dom: HTMLElement | string);
    init(): void;
    render(): void;
    private renderRequested;
    requestRender(): void;
    addElement(element: BaseElement): void;
    private initCanvasEvents;
    private getMousePos;
    private selectedElement;
    private isDragging;
    private dragOffsetX;
    private dragOffsetY;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
}
//# sourceMappingURL=ChartMain.d.ts.map