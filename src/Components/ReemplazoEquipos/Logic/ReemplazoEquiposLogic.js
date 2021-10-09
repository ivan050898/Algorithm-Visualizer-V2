"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReemplazoEquiposLogic = void 0;
/**
 * Esta clase permitirá la ejecución del algoritmo de reemplazo de equipos.
 */
var ReemplazoEquiposLogic = /** @class */ (function () {
    /**
     *
     * @param data Datos de mantenimiento, reventa y ganancia con el formato [{year: number, resale: number, maintenance: number, gain: number}]
     * @param term Plazo del proyecto
     * @param lifeSpan Vida útil del equipo
     * @param initialCost Costo inicial del equipo
     * @param isGainActivated Si se requiere incluir ganancia
     */
    function ReemplazoEquiposLogic(data, term, lifeSpan, initialCost, isGainActivated) {
        this.isGainActivated = false; // Si se requiere incluir ganancia
        this.data = data;
        this.term = Number(term);
        this.lifeSpan = Number(lifeSpan);
        this.isGainActivated = isGainActivated;
        this.initialCost = Number(initialCost);
    }
    /**
     * Inicia la ejecución del algoritmo.
     * Primero averigua los Ctx
     * Luego crea G_List, para la creación de la matriz resultado,
     *  con tamaño de term + 1 por el hecho de que se empieza en el instante 0.
     * Luego crea K_List donde se guardarán los K's elegidos en cada iteración (instante)
     *  con tamaño de term + 1 por el hecho de que se empieza en el instante 0.
     * Luego el ciclo conocido por cada instante t se calculará G(t) que en este caso se le envían más datos por referencia
     *  para que pueda realizar los cálculos sobre ellos.
     * Luego se calcula el resultado, que realmente lo que realiza una mezcla entre los resultados de G_List
     * y K_List para cada instante.
     */
    ReemplazoEquiposLogic.prototype.execute = function () {
        // Averigua los Ctx
        var Ctx_list = this.buscar_valores_k(this.data, this.lifeSpan, this.initialCost);
        var G_List = new Array(this.term + 1).fill(0);
        var K_List = new Array(this.term + 1).fill([]);
        var pos = this.term - 1;
        while (pos >= 0) {
            G_List[pos] = this.G(G_List, K_List, this.lifeSpan, pos, Ctx_list, this.term);
            pos -= 1;
        }
        var result = this.createResult(G_List, K_List);
        return result;
    };
    /**
     * Calcula los valores K para un instante t.
     * @param G_List Lista de G(t) anteriores
     * @param K_List Lista de K's anteriores
     * @param vida_util Vida util del equipo
     * @param pos Posición actual del instante
     * @param K_list Ctx lista
     * @param plazo Plazo del proyecto
     */
    ReemplazoEquiposLogic.prototype.G = function (G_List, K_List, vida_util, pos, Ctx_list, plazo) {
        var k_list = [];
        /* G(t) = min {Ctx + G(x)} */
        // Todo k desde 1 hasta la vida util del equipo y menor al plazo del proyecto
        var k = 1;
        while (k <= vida_util && pos + k <= plazo) {
            k_list.push(Ctx_list[k - 1] + G_List[pos + k]);
            k += 1;
        }
        var res = this.getMin(k_list);
        K_List[pos] = this.get_indexes(k_list, res, pos);
        /* -- */
        return res;
    };
    /**
     * Lo que hace es averiguar los instantes de los valores k mínimos encontrados en la función G(t)
     * Para evalúa el índice en la lista de k's a partir de la posición (instante t) que se está
     * analizando.
     * @param list_ Lista de k's encontrados en la iteración
     * @param value valor mínimo encontrado
     * @param pos Posición actual o instante t
     */
    ReemplazoEquiposLogic.prototype.get_indexes = function (list_, value, pos) {
        var res = [];
        for (var i = 0; i < list_.length; i++) {
            if (list_[i] == value) {
                res.push(pos + i + 1);
            }
        }
        return res;
    };
    /**
     * Averigua todos los Ctx iniciales para saber el costo de comprar un equipo en el insante t
     * y venderlo en el x
     * @param datos datos de mantenimieno, reventa y ganancia
     * @param vida_util vida útil del equipo
     * @param valor_nuevo costo inicial del equipo
     */
    ReemplazoEquiposLogic.prototype.buscar_valores_k = function (datos, vida_util, valor_nuevo) {
        var K = [];
        for (var k = 0; k < vida_util; k++) {
            var newK = valor_nuevo;
            for (var i = 0; i < k + 1; i++) {
                newK += Number(datos[i].maintenance);
                newK -= Number(datos[i].gain); // Uncomment if gain is not accumulative
            }
            newK -= Number(datos[k].resale);
            K.push(newK);
        }
        return K;
    };
    /**
     * Realiza la combinación de los costos G_list y los instantes siguientes en el plan K_List
     * @param G_List Costos G(t)
     * @param K_List Instantes siguientes
     */
    ReemplazoEquiposLogic.prototype.createResult = function (G_List, K_List) {
        var result = [];
        for (var i = 0; i < G_List.length; i++) {
            result.push([i, G_List[i], K_List[i]]);
        }
        return result;
    };
    /**
     *  A partir de una tabla de análisis generada por el algoritmo, se calculan los planes a seguir
     *  según las diferentes opciones que se pueden generar al haber k's mínimos empatados.
     * @param analisisTable tabla de análisis
     */
    ReemplazoEquiposLogic.prototype.getPlans = function (analisisTable) {
        var result = [];
        this.getPlansAux(analisisTable, 0, result, []);
        return result;
    };
    ReemplazoEquiposLogic.prototype.getPlansAux = function (G_list, pos, result, path) {
        var _this = this;
        path.push(pos);
        if (G_list[pos][2].length > 0) {
            G_list[pos][2].forEach(function (next) {
                _this.getPlansAux(G_list, next, result, path.slice());
            });
        }
        else {
            result.push(path);
        }
    };
    /**
     * Obtiene el mínimo valor en un arreglo de enteros.
     * @param arrayL Arreglo de enteros.
     */
    ReemplazoEquiposLogic.prototype.getMin = function (arrayL) {
        var min = arrayL[0];
        arrayL.forEach(function (value) {
            if (Number(value) < Number(min)) {
                min = value;
            }
        });
        return min;
    };
    return ReemplazoEquiposLogic;
}());
exports.ReemplazoEquiposLogic = ReemplazoEquiposLogic;
