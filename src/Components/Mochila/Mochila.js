import "./Mochila.css";
import { Fragment } from "react";
import SideBar from "../SideBar/SideBar.js";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { useFilePicker } from "use-file-picker";
import { Knapsack01 } from "./Logic/Knapsack01";
import { BoundedKnapsack } from "./Logic/Bounded";
import { UnboundedKnapsack } from "./Logic/UnBounded";

const Mochila = () => {
  const [CantidadObjetos, SetCantidadObjetos] = useState(1);
  const [CapacidadMochila, SetCapacidadMochila] = useState(1);
  const [Solucion, SetSolucion] = useState(false);
  const [Objetos, setObjetos] = useState([
    { id: 0, cost: 0, value: 0, quantity: 1, selected: false, count: 0 },
  ]);
  const [Matrix, SetMatrix] = useState([[0], [0]]);
  const [Matrix2, SetMatrix2] = useState([[0], [0]]);
  const [Type, SetType] = useState(0);

  const Ejecutar = () => {
    let res = JSON.parse(JSON.stringify(Objetos));

    res.forEach((item, i) => {
      res[i].cost = parseInt(
        document.getElementById("cost-" + i.toString()).value
      );
      res[i].value = parseInt(
        document.getElementById("value-" + i.toString()).value
      );

      res[i].quantity = parseInt(
        document.getElementById("quantity-" + i.toString()).value == "Infinity"
          ? Number.MAX_SAFE_INTEGER
          : document.getElementById("quantity-" + i.toString()).value
      );
      if (res[i].quantity === Number.MAX_SAFE_INTEGER)
        res[i].quantity = Infinity;
    });
    setObjetos(res);
    if (Type == 0) {
      new Knapsack01(
        Matrix,
        Matrix2,
        CantidadObjetos,
        Matrix.length,
        res
      ).execute();
    } else if (Type == 1) {
      new BoundedKnapsack(
        Matrix,
        Matrix2,
        CantidadObjetos,
        Matrix.length,
        res
      ).execute();
    } else {
      new UnboundedKnapsack(
        Matrix,
        Matrix2,
        CantidadObjetos,
        Matrix.length,
        res
      ).execute();
    }
    console.log(res);
    res = getSelectedItems(res);
    if (getQuantity() === Infinity) {
      res.forEach((item, i) => {
        res[i].quantity = Infinity;
      });
    }
    setObjetos(res);
  };

  const getQuantity = () => {
    return Type == 0 || Type == 1 ? 1 : Infinity;
  };

  const addItem = () => {
    if (CantidadObjetos < 10) {
      SetCantidadObjetos(CantidadObjetos + 1);
      let res = JSON.parse(JSON.stringify(Objetos));
      res.push({
        id: Objetos.length,
        cost: 0,
        value: 0,
        quantity: getQuantity(),
        selected: false,
        count: 0,
      });
      Matrix.forEach((row) => {
        row.push(0);
      });
      Matrix2.forEach((row) => {
        row.push(0);
      });
      res.forEach((item, i) => {
        res[i].quantity = res[res.length - 1].quantity;
      });
      setObjetos(res);
    }
  };

  const RemoveItem = () => {
    if (CantidadObjetos > 1) {
      SetCantidadObjetos(CantidadObjetos - 1);
      let res = JSON.parse(JSON.stringify(Objetos));
      res.pop();
      var quantity = Type != 2 ? 1 : Infinity;
      res.forEach((item, i) => {
        res[i].quantity = quantity;
      });
      setObjetos(res);
      Matrix.forEach((row) => {
        row.pop();
      });
      Matrix2.forEach((row) => {
        row.pop();
      });
    }
  };

  const AddCapacity = () => {
    if (CapacidadMochila < 20) {
      SetCapacidadMochila(CapacidadMochila + 1);
      Matrix.push(new Array(CantidadObjetos).fill(0));
      Matrix2.push(new Array(CantidadObjetos).fill(0));
    }
  };

  const removeCapacity = () => {
    if (CapacidadMochila > 1) {
      SetCapacidadMochila(CapacidadMochila - 1);
      Matrix.pop();
      Matrix2.pop();
    }
  };

  const changeKind = () => {
    unstable_batchedUpdates(() => {
      var Combo = document.getElementById("ComboTipo");
      var valorCombo = parseInt(Combo.options[Combo.selectedIndex].value);
      var quantity = valorCombo != 2 ? 1 : Infinity;
      let res = JSON.parse(JSON.stringify(Objetos));
      res.forEach((item) => {
        item.quantity = quantity;
      });
      setObjetos(res);
      SetType(valorCombo);
    });
  };

  const GetTd = (i, j) => {
    if (Type == 0 && Matrix2[i][j] == 0) {
      return (
        <td style={{ backgroundColor: "red" }}>
          <p>{Matrix[i][j]}</p>
        </td>
      );
    } else if (Type == 0 && Matrix2[i][j] != 0) {
      return (
        <td style={{ backgroundColor: "green" }}>
          <p>{Matrix[i][j]}</p>
        </td>
      );
    } else if (Type != 0 && Matrix2[i][j] == 0) {
      return (
        <td style={{ backgroundColor: "red" }}>
          <p>
            {Matrix[i][j]}
            <sub>
              x<sub>{j}</sub>={Matrix2[i][j]}
            </sub>
          </p>
        </td>
      );
    } else {
      return (
        <td style={{ backgroundColor: "green" }}>
          <p>
            {Matrix[i][j]}
            <sub>
              x<sub>{j}</sub>={Matrix2[i][j]}
            </sub>
          </p>
        </td>
      );
    }
  };

  const getSelectedItems = (Matriz) => {
    let i = Matrix2.length - 1;
    let j = Objetos.length - 1;
    let res = JSON.parse(JSON.stringify(Matriz));
    while (j >= 0) {
      res[j].selected = Matrix2[i][j] != 0;
      res[j].count = Matrix2[i][j];
      i = i - Matrix2[i][j] * res[j].cost;
      j -= 1;
    }
    return res;
  };

  const GuardarArchivo = () => {
    let res = JSON.parse(JSON.stringify(Objetos));
    if (getQuantity() === Infinity) {
      res.forEach((item, i) => {
        res[i].quantity = "Infinity";
      });
    }
    res.forEach((item, i) => {
      res[i].selected = false;
      res[i].quantity = res[i].quantity.toString();
      res[i].cost = res[i].cost.toString();
      res[i].value = res[i].value.toString();
    });
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify({
            tipo: Type,
            knapsacksize: CapacidadMochila,
            items: res,
          })
        )
    );
    element.setAttribute("download", "mochila.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const CargarArchivo = (event) => {
    ReiniciarEstados();
    let selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result.toString().trim();
      const file = JSON.parse(text);
      loadFile(file);
    };
    reader.readAsText(selectedFile);
  };

  const ReiniciarEstados = () => {
    unstable_batchedUpdates(() => {
      SetCantidadObjetos(1);
      SetCapacidadMochila(1);
      SetSolucion(false);
      setObjetos([
        { id: 0, cost: 0, value: 0, quantity: 1, selected: false, count: 0 },
      ]);
      SetMatrix([[0], [0]]);
      SetMatrix2([[0], [0]]);
      SetType(0);
    });
  };

  const loadFile = (file) => {
    unstable_batchedUpdates(() => {
      SetCantidadObjetos(file.items.length);
      SetCapacidadMochila(file.knapsacksize);
      SetSolucion(false);
      setObjetos(file.items);
      SetMatrix(
        new Array(file.knapsacksize + 1)
          .fill(0)
          .map(() => new Array(file.items.length).fill(0))
      );
      SetMatrix2(
        new Array(file.knapsacksize + 1)
          .fill(0)
          .map(() => new Array(file.items.length).fill(0))
      );
      SetType(file.tipo);
    });
  };

  return (
    <Fragment>
      <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
        <div className="row">
          <div className="col-sm-4 card" style={{ height: "1000px" }}>
            <div>
              <h6
                style={{
                  paddingRight: "10px",
                  paddingBottom: "30px",
                  display: "inline-block",
                }}
              >
                Tipo:
              </h6>
              <select
                id="ComboTipo"
                class="form-select form-select-sm"
                style={{ width: "200px", display: "inline-block" }}
                onChange={() => changeKind()}
                value={Type}
              >
                <option value="0" >
                  0/1 Knapsack
                </option>
                <option value="1">Boudned Knapsack</option>
                <option value="2">Unbounded Knapsack</option>
              </select>

              <button
                className="btn btn-dark"
                onClick={() => SetSolucion(!Solucion)}
                style={{ marginLeft: "240px" }}
              >
                <i class="fas fa-exchange-alt"></i>
              </button>
            </div>

            <div className="number" style={{ marginBottom: "30px" }}>
              <h6
                style={{ padding: "0", margin: "0", display: "inline-block" }}
              >
                Cantidad de Objetos:{" "}
              </h6>

              <button
                className="btn btn-dark"
                style={{ marginLeft: "10px" }}
                onClick={() => RemoveItem()}
              >
                -
              </button>
              <input
                type="text"
                value={CantidadObjetos}
                style={{ width: "55px", height: "35px" }}
              />
              <button className="btn btn-dark" onClick={() => addItem()}>
                +
              </button>
            </div>
            <div className="number" style={{ marginBottom: "30px" }}>
              <h6
                style={{ padding: "0", margin: "0", display: "inline-block" }}
              >
                Capacidad de la mochila:{" "}
              </h6>

              <button
                className="btn btn-dark"
                style={{ marginLeft: "10px" }}
                onClick={() => removeCapacity()}
              >
                -
              </button>
              <input
                type="text"
                value={CapacidadMochila}
                style={{ width: "55px", height: "35px" }}
              />
              <button className="btn btn-dark" onClick={() => AddCapacity()}>
                +
              </button>
            </div>
            {!Solucion && <h6>Lista de objetos: </h6>}
            {!Solucion &&
              Objetos.map((item, i) => {
                return (
                  <div key={uuidv4()}>
                    <h6
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "10px",
                        paddingBottom: "10px",
                        display: "inline-block",
                      }}
                    >
                      item <strong>#{item.id} </strong> &#x2192; {"C"}
                      <sub>{item.id}</sub>:
                    </h6>
                    <input
                      id={"cost-" + i.toString()}
                      defaultValue={item.cost}
                      style={{ width: "50px", display: "inline-block" }}
                    ></input>
                    <h6
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "10px",
                        paddingBottom: "10px",
                        display: "inline-block",
                      }}
                    >
                      V<sub>{item.id}</sub>:
                    </h6>
                    <input
                      id={"value-" + i.toString()}
                      defaultValue={item.value}
                      style={{ width: "50px", display: "inline-block" }}
                    ></input>
                    <h6
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "10px",
                        paddingBottom: "10px",
                        display: "inline-block",
                      }}
                    >
                      Q<sub>{item.id}</sub>:
                    </h6>
                    <input
                      id={"quantity-" + i.toString()}
                      defaultValue={item.quantity}
                      disabled={Type == 0 || Type == 2 ? true : false}
                      style={{ width: "50px", display: "inline-block" }}
                    ></input>
                  </div>
                );
              })}
            {Solucion && <h6>Representación matemática: </h6>}
            {Solucion && (
              <div style={{ display: "inline-block", marginBottom: "10px" }}>
                <div>
                  max <strong>Z</strong> =
                  {Objetos.map((item, i) => {
                    return (
                      <Fragment>
                        {" "}
                        <p style={{ display: "inline-block" }}>
                          {" "}
                          {item.value}x<sub>{item.id}</sub>
                        </p>
                        {item.id != Objetos.length - 1 && (
                          <p style={{ display: "inline-block" }}>+</p>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
                <div>
                  Sujeto a:
                  {Objetos.map((item, i) => {
                    return (
                      <Fragment>
                        {" "}
                        <p style={{ display: "inline-block" }}>
                          {" "}
                          {item.cost}x<sub>{item.id}</sub>
                        </p>
                        {item.id != Objetos.length - 1 && (
                          <p style={{ display: "inline-block" }}>+</p>
                        )}
                      </Fragment>
                    );
                  })}
                  <p>&#x2264;{CapacidadMochila}</p>
                </div>
                <p>Solución: </p>
                <div style={{ display: "inline-block" }}>
                  &#123;
                  {Objetos.map((item, i) => {
                    return (
                      <Fragment>
                        {" "}
                        <p style={{ display: "inline-block" }}>
                          x<sub>{item.id}</sub> = {item.count}
                          {item.id != Objetos.length - 1 && (
                            <p style={{ display: "inline-block" }}> , </p>
                          )}
                        </p>
                      </Fragment>
                    );
                  })}
                  &#125;
                </div>
              </div>
            )}
            <div className="row" style={{ paddingTop: "20px" }}>
              <div className="col-sm-6 ">
                <div
                  class="input-group mb-3"
                  style={{
                    width: "350px",
                  }}
                >
                  <input
                    type="file"
                    id="inputGroupFile02"
                    style={{
                      backgroundColor: "teal",
                      color: "white",
                      marginRight: "20px",
                    }}
                    onChange={(e) => CargarArchivo(e)}
                  ></input>
                </div>

                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                    marginBottom: "30px",
                  }}
                  onClick={() => GuardarArchivo()}
                >
                  Guardar Archivo &nbsp;
                  <i class="fas fa-save"></i>
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "40px",
                  }}
                  onClick={() => window.location.reload()}
                >
                  Resetear
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  onClick={() => Ejecutar()}
                >
                  Ejecutar
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-7 card" style={{ height: "1250px" }}>
            <div class="table-responsive-sm">
              <table class="table table-bordered table-sm ">
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    {Objetos.map((item, i) => {
                      return (
                        <th
                          scope="col"
                          style={{
                            backgroundColor: item.selected ? "green" : null,
                          }}
                        >
                          #{i}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Matrix.map((fila, i) => {
                    return (
                      <tr>
                        <th scope="col">{i}</th>
                        {fila.map((columna, j) => {
                          return GetTd(i, j);
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SideBar></SideBar>
    </Fragment>
  );
};

export default Mochila;
