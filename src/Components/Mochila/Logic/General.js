"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralKnapsack = void 0;
/*
    GeneralKnapsack
    Permite la ejecución del algoritmo general de la mochila. Es una clase abstracta
    la cual los algoritmos de 01Knapsack, BoundedKnapsack y UnboundedKnapsack deben extender
    e implementar el método calculateValuesWhenFirstObject.
*/
var GeneralKnapsack = /** @class */ (function () {
    /*
        T: tabla de ejecución.
        X: tabla de x's, donde se sabe cuántos se llevan de cada uno.
        n: cantidad de objetos
        C: capacidad de la mochila.
        items: la lista de objetos, estos deben tener costo, valor y cantidad disponible.
    */
    function GeneralKnapsack(T, X, n, C, items) {
        this.T = T;
        this.X = X;
        this.n = n;
        this.C = C;
        this.items = items;
    }
    GeneralKnapsack.prototype.execute = function () {
        var j;
        // For j = 0 to N -1 -> Todos los objetos hasta el último
        for (j = 0; j < this.n; j++) {
            // For i = 0 to C - 1 -> Todos las capacidades hasta la máxima
            var i;
            for (i = 0; i < this.C; i++) {
                if (this.items[j].cost > 0 && this.items[j].value > 0) { // We need value and cost
                    if (i == 0) { // Si es la capacidad 0 no puedo llevar nada
                        this.T[i][j] = 0;
                        this.X[i][j] = 0;
                    }
                    else { // Si la capacidad es mayor a 0 (nunca será menor)
                        if (this.items[j].quantity > 0) { // si aun quedan objetos de este tipo
                            if (j == 0) { // Si estamos en la columna 0, es decir, primer objeto
                                if ((i - this.items[j].cost) >= 0) { // Si me alcanza el costo del objeto actual con la capacidad que estoy analizando
                                    this.calculateValuesWhenFirstObject(i, j); // Se calcula cuántos se puede llevar según la capacidad y la cantidad de objetos
                                }
                                else { // Si no me alcanza no puedo llevar
                                    this.T[i][j] = 0;
                                    this.X[i][j] = 0;
                                }
                            }
                            else { // Si no es la primera columna
                                this.calculateValuesWhenNotFirstObject(i, j);
                            }
                        }
                    }
                }
                else {
                    this.T[i][j] = 0;
                    this.X[i][j] = 0;
                }
            }
        }
    };
    /*
        Calcula cual es el valor de la celda T[i][j] cuando no encuentra en el primer objeto.
        Recibe:
            posición i (fila) de la tabla.
            posición j (columna) de la tabla.
        Procedimiento:
            en este caso calculará cuantos objetos del tipo de objeto se puede llevar según
            la fórmula matemática
            T[i][j] = max(T[i][j - 1],
                        1 * v[j] + T[i - (1 * c[j])] [j - 1],
                        2 * v[j] + T[i - (2 * c[j])] [j - 1]
                        ...
                        ...
                        ...
                        Q * v[j] + T[i - (Q * c[j])] [j - 1]
                ) donde Q es la cantidad máxima disponible para un objeto.
    */
    GeneralKnapsack.prototype.calculateValuesWhenNotFirstObject = function (i, j) {
        // getting possibles x
        var x = 1;
        var pX = [this.T[i][j - 1]];
        var maxX = this.items[j].quantity;
        while ((i - (x * this.items[j].cost) >= 0) && (x <= maxX || maxX == Infinity)) {
            pX.push(x * Number(this.items[j].value) + Number(this.T[i - (x * this.items[j].cost)][j - 1]));
            x += 1;
        }
        var result = this.getMax(pX);
        this.T[i][j] = result;
        this.X[i][j] = pX.indexOf(result);
    };
    GeneralKnapsack.prototype.getMax = function (arrayL) {
        var maxFound = arrayL[0];
        arrayL.forEach(function (value) {
            if (value > maxFound) {
                maxFound = value;
            }
        });
        return maxFound;
    };

   
    return GeneralKnapsack;


}());
exports.GeneralKnapsack = GeneralKnapsack;