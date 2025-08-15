'use strict';

class Chart {
    constructor(container) {
        if (typeof container === 'string') {
            const element = document.querySelector(container);
            if (!element)
                throw new Error(`Container ${container} not found`);
            container = element;
        }
        this.canvas = document.createElement('canvas');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }
    destroy() {
        var _a;
        (_a = this.canvas.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.canvas);
    }
}

class BaseElement {
    constructor(x, y, width, height, strokeColor = '#ff0000', strokeWidth = 2, strokeDash = [] // 虚线模式
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;
        this.selected = false;
    }
    draw(ctx) {
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
    contains(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }
}

// src/core/types.ts
class RectElement extends BaseElement {
    constructor(x, y, width, height, color = '#3498db') {
        super(x, y, width, height);
        this.color = color;
    }
    drawContent(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class CircleElement extends BaseElement {
    constructor(x, y, radius, color = '#e74c3c') {
        super(x, y, radius * 2, radius * 2);
        this.radius = radius;
        this.color = color;
    }
    drawContent(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    contains(x, y) {
        const dx = x - (this.x + this.radius);
        const dy = y - (this.y + this.radius);
        return dx * dx + dy * dy <= this.radius * this.radius;
    }
    // 覆盖draw方法以支持圆形描边
    draw(ctx) {
        this.drawContent(ctx);
        if (this.selected) {
            ctx.save();
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;
            ctx.setLineDash(this.strokeDash);
            ctx.beginPath();
            ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }
}

class ChartMain extends Chart {
    constructor(dom) {
        super(dom);
        this.elements = [];
        this.selectedElement = null;
        this.isDragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        // 性能优化
        this.renderRequested = false;
        this.initCanvasEvents();
        this.init();
    }
    init() {
        // 添加带描边样式的元素
        const rect = new RectElement(50, 50, 100, 80, '#2ecc71');
        rect.strokeColor = '#e67e22';
        rect.strokeWidth = 3;
        rect.strokeDash = [5, 5]; // 虚线描边
        this.addElement(rect);
        // 圆形元素
        const circle = new CircleElement(200, 100, 50, '#9b59b6');
        circle.strokeColor = '#34495e';
        this.addElement(circle);
    }
    addElement(element) {
        this.elements.push(element);
        this.render();
    }
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 绘制所有元素
        this.elements.forEach(element => {
            this.ctx.save();
            element.draw(this.ctx);
            this.ctx.restore();
        });
    }
    requestRender() {
        if (!this.renderRequested) {
            this.renderRequested = true;
            requestAnimationFrame(() => {
                this.render();
                this.renderRequested = false;
            });
        }
    }
    initCanvasEvents() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    }
    getMousePos(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    handleMouseDown(evt) {
        const pos = this.getMousePos(evt);
        // 检查是否点击了元素
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
    handleMouseMove(evt) {
        if (!this.isDragging || !this.selectedElement)
            return;
        const pos = this.getMousePos(evt);
        this.selectedElement.x = pos.x - this.dragOffsetX;
        this.selectedElement.y = pos.y - this.dragOffsetY;
        this.requestRender();
    }
    handleMouseUp() {
        this.isDragging = false;
        this.selectedElement = null;
    }
}

exports.Chart = Chart;
exports.ChartMain = ChartMain;
//# sourceMappingURL=chart-library.js.map
