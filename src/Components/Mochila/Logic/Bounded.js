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
exports.BoundedKnapsack = void 0;
var General_1 = require("./General.js");
var BoundedKnapsack = /** @class */ (function (_super) {
    __extends(BoundedKnapsack, _super);
    function BoundedKnapsack(T, X, n, C, items) {
        return _super.call(this, T, X, n, C, items) || this;
    }
    BoundedKnapsack.prototype.calculateValuesWhenFirstObject = function (i, j) {
        var x = 1;
        while ((i - (x * Number(this.items[j].cost))) >= 0 && x <= this.items[j].quantity) {
            x += 1;
        }
        x = x - 1; 
        this.X[i][j] = x;
        this.T[i][j] = Number(this.items[j].value) * x;
        console.log(this.T[i][j]);
    };
    return BoundedKnapsack;
}(General_1.GeneralKnapsack));
exports.BoundedKnapsack = BoundedKnapsack;