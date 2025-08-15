(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ChartLibrary = {}));
})(this, (function (exports) { 'use strict';

    class Chart {
        constructor(container) {
            if (typeof container === 'string') {
                const element = document.querySelector(container);
                if (!element)
                    throw new Error(`Container ${container} not found`);
                container = element;
            }
            this.canvas = document.createElement('canvas');
            container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
        }
        destroy() {
            var _a;
            (_a = this.canvas.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.canvas);
        }
    }

    exports.Chart = Chart;

}));
//# sourceMappingURL=chart-library.umd.js.map
