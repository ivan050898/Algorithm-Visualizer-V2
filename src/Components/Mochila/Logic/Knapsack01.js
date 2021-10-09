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
exports.Knapsack01 = void 0;
var General_1 = require("./General.js");
var Knapsack01 = /** @class */ (function (_super) {
    __extends(Knapsack01, _super);
    function Knapsack01(T, X, n, C, items) {
        return _super.call(this, T, X, n, C, items) || this;
    }
    Knapsack01.prototype.calculateValuesWhenFirstObject = function (i, j) {
        this.T[i][j] = this.items[j].value;
        this.X[i][j] = 1;
    };
    Knapsack01.prototype.calculateValuesWhenNotFirstObject = function (i, j) {
        if ((i - this.items[j].cost) >= 0) {
            var pX = [this.T[i][j - 1]];
            pX.push(Number(this.items[j].value) + Number(this.T[i - this.items[j].cost][j - 1]));
            var result = this.getMax(pX);
            this.T[i][j] = result;
            this.X[i][j] = pX.indexOf(result);
        }
        else {
            this.T[i][j] = this.T[i][j - 1];
            this.X[i][j] = 0;
        }
    };
    return Knapsack01;
}(General_1.GeneralKnapsack));
exports.Knapsack01 = Knapsack01;
