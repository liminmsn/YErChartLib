import { RectElement, CircleElement, BaseElement } from "../element/BaseElement";
import { Chart } from "./Chart";


export class ChartMain extends Chart {
    private elements: BaseElement[] = [];
    constructor(dom: HTMLElement | string) {
        super(dom);
        this.initCanvasEvents();
        this.init();
    }
    init() {
        const rect = new RectElement(50, 50, 100, 80);
        rect.strokeColor = '#e67e22';
        this.addElement(rect);

        // 圆形元素
        const circle = new CircleElement(200, 100, 50, '#9b59b6');
        this.addElement(circle);
    }
    render(): void {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 绘制所有元素
        this.elements.forEach(element => {
            this.ctx.save();
            element.draw(this.ctx);
            this.ctx.restore();
        });
    }
    // 性能优化
    private renderRequested = false;
    requestRender() {
        if (!this.renderRequested) {
            this.renderRequested = true;
            requestAnimationFrame(() => {
                this.render();
                this.renderRequested = false;
            });
        }
    }

    addElement(element: BaseElement) {
        this.elements.push(element);
        this.render();
    }
    private initCanvasEvents() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    }
    private getMousePos(evt: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    private selectedElement: BaseElement | null = null;
    private isDragging = false;
    private dragOffsetX = 0;
    private dragOffsetY = 0;
    private handleMouseDown(evt: MouseEvent) {
        const pos = this.getMousePos(evt);
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const element = this.elements[i];
            if (pos.x >= element.x && pos.x <= element.x + element.width &&
                pos.y >= element.y && pos.y <= element.y + element.height) {
                this.selectedElement = element;
                this.isDragging = true;
                this.dragOffsetX = pos.x - element.x;
                this.dragOffsetY = pos.y - element.y;
                break;
            }
        }

        // 中键点击 (button === 1)
        if (evt.button === 1) {
            evt.preventDefault(); // 防止浏览器默认行为

            // 清除之前选中的元素
            this.elements.forEach(el => el.selected = false);

            // 查找并选中元素
            for (let i = this.elements.length - 1; i >= 0; i--) {
                if (this.elements[i].contains(pos.x, pos.y)) {
                    this.elements[i].selected = true;
                    break;
                }
            }

            this.render();
            return;
        }
    }
    private handleMouseMove(evt: MouseEvent) {
        if (!this.isDragging || !this.selectedElement) return;

        const pos = this.getMousePos(evt);
        this.selectedElement.x = pos.x - this.dragOffsetX;
        this.selectedElement.y = pos.y - this.dragOffsetY;
        this.requestRender();
    }
    private handleMouseUp() {
        this.isDragging = false;
        this.selectedElement = null;
    }
}