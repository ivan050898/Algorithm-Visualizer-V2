"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnboundedKnapsack = void 0;
var General_1 = require("./General.js");
var UnboundedKnapsack = /** @class */ (function (_super) {
    __extends(UnboundedKnapsack, _super);
    function UnboundedKnapsack(T, X, n, C, items) {
        return _super.call(this, T, X, n, C, items) || this;
    }
    UnboundedKnapsack.prototype.calculateValuesWhenFirstObject = function (i, j) {
        this.X[i][j] = Math.floor(Number(i) / Number(this.items[j].cost));
        this.T[i][j] = this.items[j].value * this.X[i][j];
    };
    return UnboundedKnapsack;
}(General_1.GeneralKnapsack));
exports.UnboundedKnapsack = UnboundedKnapsack;