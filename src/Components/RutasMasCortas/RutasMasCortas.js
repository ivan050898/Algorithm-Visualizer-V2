import "./RutasMasCortas.css";
import { Fragment } from "react";
import SideBar from "../SideBar/SideBar.js";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { useFilePicker } from "use-file-picker";

const RutasMascortas = () => {
  const NodosDefault = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [RutaOptima, setRutaOptima] = useState(false);
  const [VerP, setVerP] = useState(false);
  const [cantidadNodos, setcantidadNodos] = useState(1);
  const [MatrizInputs, setMatrizInputs] = useState([["0"]]);
  const [MatrizPActual, setMatrizPActual] = useState([["0"]]);
  const [NodosActuales, setNodosActuales] = useState(["A"]);
  const [MatrixIndex, setMatrixIndex] = useState(0);
  const [MatricesD, setMatricesD] = useState([]);
  const [MatricesP, setMatricesP] = useState([]);
  const [Ruta, setRuta] = useState("");
  const [Deshabilitado, setDeshabilitado] = useState(true);

  
  const ReiniciarEstados= () =>{
    unstable_batchedUpdates(() => {
      setRutaOptima(false)
      setVerP(false)
      setMatrizInputs([["0"]])
      setMatrizPActual([["0"]])
      setNodosActuales(["A"])
      setMatrixIndex(0)
      setMatricesD([])
      setMatricesP([])
      setRuta("")
      setDeshabilitado(true)
    });
  }

  const GenerarD0 = (modo) => {
    let largo = modo ? cantidadNodos + 1 : cantidadNodos - 1;
    let newMatriz = new Array(largo)
      .fill(0)
      .map(() => new Array(largo).fill(0));
    for (let i = 0; i < largo; i++) {
      for (let j = 0; j < largo; j++) {
        if (i == j) {
          newMatriz[i][j] = "0";
        } else {
          newMatriz[i][j] = "∞";
        }
      }
    }

    setMatrizInputs(newMatriz);
  };

  const CrearMatriz = () => {
    let newMatriz = new Array(cantidadNodos)
      .fill(0)
      .map(() => new Array(cantidadNodos).fill(0));
    return newMatriz;
  };

  const copyMatrix = (Matriz1, Matriz2) => {
    for (let i = 0; i < cantidadNodos; i++) {
      for (let j = 0; j < cantidadNodos; j++) {
        Matriz1[i][j] = Matriz2[i][j];
      }
    }
    return Matriz1;
  };

  const AumentarCantidadNodos = () => {
    if (cantidadNodos < 10) {
      unstable_batchedUpdates(() => {
        setcantidadNodos(cantidadNodos + 1);
        let ArrayNuevo = NodosActuales;
        ArrayNuevo.push(NodosDefault[cantidadNodos]);
        setNodosActuales(ArrayNuevo);
        GenerarD0(true);
      });
    }
  };

  const DecremetarCantidadNodos = () => {
    if (cantidadNodos > 1) {
      unstable_batchedUpdates(() => {
        setcantidadNodos(cantidadNodos - 1);
        let ArrayNuevo = NodosActuales;
        ArrayNuevo.pop();
        setNodosActuales(ArrayNuevo);
        GenerarD0(false);
      });
    }
  };

  const CambiarNombreNodo = (valor, index) => {
    let ArrayNuevo = NodosActuales;
    ArrayNuevo[index] = valor;
    setNodosActuales([...ArrayNuevo]);
  };

  const ActualizarMatriz = (valor, i, j) => {
    let MatrizNueva = MatrizInputs;
    MatrizInputs[i][j] = valor;
    setMatrizInputs(MatrizNueva);
  };

  const TransformarMatriz = (Matriz) => {
    for (let i = 0; i < cantidadNodos; i++) {
      for (let j = 0; j < cantidadNodos; j++) {
        if (Matriz[i][j] == "∞") {
          Matriz[i][j] = Number.MAX_SAFE_INTEGER;
        } else {
          Matriz[i][j] = parseInt(Matriz[i][j]);
        }
      }
    }
    return Matriz;
  };

  const HacerP0 = (Matriz) => {
    var Resultado = new Array(cantidadNodos)
      .fill(0)
      .map(() => new Array(cantidadNodos).fill(0));
    const Parseo = JSON.parse(JSON.stringify(Matriz));
    for (let i = 0; i < cantidadNodos; i++) {
      for (let j = 0; j < cantidadNodos; j++) {
        if (Parseo[i][j] === "∞") {
          Resultado[i][j] = "-1";
        } else {
          Resultado[i][j] = "0";
        }
      }
    }
    return Resultado;
  };

  const Floyd = () => {
    setDeshabilitado(false)
    let matrizP = HacerP0(JSON.parse(JSON.stringify(MatrizInputs)));
    let newMatriz = CrearMatriz();
    let matrizResultado = MatrizInputs;
    let matricesD = [];
    let matricesP = [];
    matricesD.push(copyMatrix(CrearMatriz(), MatrizInputs));
    copyMatrix(newMatriz, MatrizInputs);
    TransformarMatriz(newMatriz);
    matricesP.push(copyMatrix(CrearMatriz(), matrizP));
    for (let k = 0; k < cantidadNodos; k++) {
      for (let i = 0; i < cantidadNodos; i++) {
        for (let j = 0; j < cantidadNodos; j++) {
          if (newMatriz[i][k] + newMatriz[k][j] < newMatriz[i][j]) {
            newMatriz[i][j] = newMatriz[i][k] + newMatriz[k][j];
            matrizResultado[i][j] = (
              newMatriz[i][k] + newMatriz[k][j]
            ).toString();
            matrizP[i][j] = k + 1;
          }
        }
      }
      matricesD.push(copyMatrix(CrearMatriz(), matrizResultado));
      matricesP.push(copyMatrix(CrearMatriz(), matrizP));
    }
    setMatrixIndex(cantidadNodos);
    setMatricesD(matricesD);
    setMatricesP(matricesP);
    setMatrizPActual(matricesP[cantidadNodos]);
  };

  const Siguiente = () => {
    if (MatrixIndex < cantidadNodos) {
      setMatrizInputs(MatricesD[MatrixIndex + 1]);
      setMatrizPActual(MatricesP[MatrixIndex + 1]);

      setMatrixIndex(MatrixIndex + 1);
    }
  };

  const Anterior = () => {
    if (MatrixIndex > 0) {
      setMatrizInputs(MatricesD[MatrixIndex - 1]);
      setMatrizPActual(MatricesP[MatrixIndex - 1]);
      setMatrixIndex(MatrixIndex - 1);
    }
  };

  const ToggleMatrizP = () => {
    setMatrizPActual(MatricesP[MatrixIndex]);
    setVerP(!VerP);
  };
  

  const constructPath = (start,arrival) => {

    let pathResult = "";
        if(parseInt(MatricesP[cantidadNodos][start][arrival])== 0) pathResult = "Ruta directa";
        else if(parseInt(MatricesP[cantidadNodos][start][arrival]) == -1) pathResult = "No hay ruta";
        else{
            pathResult = NodosActuales[start] + " " + constructPathAux(start, arrival);
        }
        return pathResult;
  
  };

  const constructPathAux = (start,arrival) => {
    if(parseInt(MatricesP[cantidadNodos][start][arrival])== 0){
       return NodosActuales[arrival];
    }
    return constructPathAux(start, parseInt(MatricesP[cantidadNodos][start][arrival]) - 1) + " " + constructPathAux(parseInt(MatricesP[cantidadNodos][start][arrival]) - 1, arrival);
  };


  const ImprimirRuta = () => {
    var Combo1 = document.getElementById('comboA');
    var valorCombo1 = Combo1.options[Combo1.selectedIndex].value;
    var Combo2= document.getElementById('comboHacia');
    var valorCombo2 = Combo2.options[Combo2.selectedIndex].value;
    setRuta(constructPath(parseInt(valorCombo1),parseInt(valorCombo2)))

  };

  const GuardarArchivo = () => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify({
            nodes: NodosActuales,
            table: MatricesD[0],
          })
        )
    );
    element.setAttribute("download", "floyd.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
  };

  const CargarArchivo = (event) => {
    ReiniciarEstados()
    let selectedFile = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = reader.result.toString().trim();
			const file = JSON.parse(text);
      loadFile(file);

		}
		reader.readAsText(selectedFile);

  }

  const loadFile = (file) => {
    unstable_batchedUpdates(() => {
      setNodosActuales(file.nodes)
      setMatrizInputs(file.table)
      setMatrixIndex(0)
      setcantidadNodos(file.nodes.length)
      setDeshabilitado(true)

    });
   
	}
 



  
  return (
    <Fragment>
      <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
        <div className="row">
          <div className="col-sm-3 card">
            <div className="number" style={{ marginBottom: "30px" }}>
              <h6
                style={{ padding: "0", margin: "0", display: "inline-block" }}
              >
                Cantidad de nodos:{" "}
              </h6>

              <button
                className="btn btn-dark"
                onClick={() => DecremetarCantidadNodos()}
                style={{ marginLeft: "10px" }}
              >
                -
              </button>
              <input
                type="text"
                value={cantidadNodos}
                style={{ width: "55px", height: "35px" }}
              />
              <button
                className="btn btn-dark"
                onClick={() => AumentarCantidadNodos()}
              >
                +
              </button>
              <div style={{ marginLeft: "150px",marginTop:"40px"}}>
                    <button className="btn btn-dark" onClick={()=>setRutaOptima(!RutaOptima)}><i class="fas fa-exchange-alt"></i></button>
              </div>
            </div>
            {!RutaOptima && (
              <div>
                {NodosActuales.map((item, i) => {
                  return (
                    <div
                      style={{ display: "inline-block", marginBottom: "10px" }}
                    >
                      <p
                        style={{ display: "inline-block", marginRight: "10px" }}
                      >
                        Nodo <strong>#{i} &#x2192; </strong>
                      </p>
                      <p
                        style={{ display: "inline-block", marginRight: "10px" }}
                      >
                        Nombre:
                      </p>
                      <input
                        defaultValue={NodosActuales[i]}
                        onChange={(e) => CambiarNombreNodo(e.target.value, i)}
                        style={{
                          padding: "0",
                          margin: "0",
                          display: "inline-block",
                          width: "100px",
                        }}
                      ></input>
                    </div>
                  );
                })}
               
                

              </div>
            )}
             {RutaOptima && (
                <div>
                  <h6>Consultar ruta más corta:</h6>
                      <div  style={{ display: "inline-block", marginBottom: "10px" }}>
                        <h6 style={{ display: "inline-block", marginRight: "10px" }}>De:</h6>
                        <select  id="comboA" class="form-select form-select-sm" aria-label=".form-select-sm example" style={{width:"200px",display: "inline-block"}}>
                            {NodosActuales.map((item, i) => {
                              return (
                                <option value={i}>{item}</option>
                              );
                            })}
                        </select>
                      </div>
                      <div >
                        <h6 style={{ display: "inline-block", marginRight: "10px" }}>A:</h6>
                        <select id="comboHacia" class="form-select form-select-sm" aria-label=".form-select-sm example"   style={{width:"200px",display: "inline-block"}}>
                        {NodosActuales.map((item, i) => {
                              return (
                                <option value={i}>{item}</option>
                              );
                            })}
                        </select>
                      </div>
                      <div  style={{ marginTop:"10px",marginLeft:"30px",marginBottom:"50px" }} >
                            <button className="btn btn-dark" onClick={()=>ImprimirRuta()}> Ver Ruta</button>
                      </div>
                      <h6>Ruta más corta:</h6>
                      <h6>{Ruta}</h6>

                </div>

              
             
             
             
             
             )}
         
             </div>
          <div className="col-sm-8 card">
            {!VerP && (
              <div class="table-responsive" style={{ width: "90%" }}>
                <table class="table table-bordered table-sm ">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "50px", height: "30px" }}>
                        D ({MatrixIndex})
                      </th>
                      {NodosActuales.map((item, i) => {
                        return (
                          <th
                            scope="col"
                            style={{ width: "50px", height: "30px" }}
                          >
                            {item}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {NodosActuales.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{item}</th>
                          {NodosActuales.map((item, j) => {
                            return (
                              <td style={{ width: "50px", height: "30px" }}>
                                <div key={uuidv4()}>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      ActualizarMatriz(e.target.value, i, j)
                                    }
                                    defaultValue={MatrizInputs[i][j].toString()}
                                    style={{ width: "50px", height: "30px" }}
                                  ></input>{" "}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {VerP && (
              <div class="table-responsive" style={{ width: "90%" }}>
                <table class="table table-bordered table-sm ">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "50px", height: "30px" }}>
                        P ({MatrixIndex})
                      </th>
                      {NodosActuales.map((item, i) => {
                        return (
                          <th
                            scope="col"
                            style={{ width: "50px", height: "30px" }}
                          >
                            {item}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {NodosActuales.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{item}</th>
                          {NodosActuales.map((item, j) => {
                            return (
                              <td style={{ width: "50px", height: "30px" }}>
                                <div key={uuidv4()}>
                                  <input
                                    type="text"
                                    readOnly={true}
                                    style={{ width: "50px", height: "30px" }}
                                    defaultValue={MatrizPActual[i][
                                      j
                                    ].toString()}
                                  ></input>{" "}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className="row" style={{ paddingTop: "100px" }}>
              <div
                className="col-sm-6 "
              >
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  onClick={() => Floyd()}
                >
                  Ejecutar
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  onClick={() => Anterior()}
                  disabled={Deshabilitado}

                >
                  Anterior
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  onClick={() => Siguiente()}
                  disabled={Deshabilitado}

                >
                  Siguiente
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  disabled={Deshabilitado}
                  onClick={() => ToggleMatrizP()}
                >
                  Matriz P
                </button>
              </div>
              <div
                className="col-sm-6 "
              >
               <div class="input-group mb-3" style={{
                    width:"350px"
                  }}>
                
                <input type="file"  id="inputGroupFile02" style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px"
                  }} onChange={(e)=>CargarArchivo(e)} ></input>
              </div>
              
                    
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  disabled={Deshabilitado}
                  onClick={()=>GuardarArchivo()}
                >
                  Guardar Archivo &nbsp;
                  <i class="fas fa-save" ></i>
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    marginRight: "20px",
                  }}
                  onClick={()=>window.location.reload()}
                >
                  Resetear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideBar></SideBar>
    </Fragment>
  );
};

export default RutasMascortas;