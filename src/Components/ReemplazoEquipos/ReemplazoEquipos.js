import { Fragment } from "react";
import "./ReemplazoEquipos.css";

import SideBar from "../SideBar/SideBar.js";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { useFilePicker } from "use-file-picker";
import { ReemplazoEquiposLogic } from "./Logic/ReemplazoEquiposLogic.js";
const ReemplazoEquipos = () => {
  const [PlazoProyecto, SetPlazoProyecto] = useState(1);
  const [VidaUtil, SetVidaUtil] = useState(1);
  const [CostoInicial, SetCostoInicial] = useState(0);

  const [Ganancia, SetGanancia] = useState(false);

  const [MatrizSolucion, SetMatrizSolucion] = useState([
    [0, 0, 0],
    [1, 0, 0],
  ]);
  const [TablaVidaUtil, SetTablaVidaUtil] = useState([
    { year: 1, resale: 0, maintenance: 0, gain: 0 },
  ]);
  const [Planes, SetPlanes] = useState([]);

  const AddLifeSpan = () => {
    if (VidaUtil < 10) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(TablaVidaUtil));
        res.push({ year: VidaUtil + 1, resale: 0, maintenance: 0, gain: 0 });
        SetVidaUtil(VidaUtil + 1);
        SetTablaVidaUtil(res);
      });
    }
  };

  const RemoveLifeSpan = () => {
    if (VidaUtil > 1) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(TablaVidaUtil));
        res.pop();
        SetVidaUtil(VidaUtil - 1);
        SetTablaVidaUtil(res);
      });
    }
  };

  const AddPlazo = () => {
    if (PlazoProyecto < 30) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(MatrizSolucion));
        res.push([PlazoProyecto + 1, 0, 0]);
        SetMatrizSolucion(res);
        SetPlazoProyecto(PlazoProyecto + 1);
      });
    }
  };

  const RemovePlazo = () => {
    if (PlazoProyecto > 1) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(MatrizSolucion));
        res.pop();
        SetMatrizSolucion(res);
        SetPlazoProyecto(PlazoProyecto - 1);
      });
    }
  };

  const ReventaOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(TablaVidaUtil));
    res[index].resale = parseInt(texto);
    SetTablaVidaUtil(res);
  };

  const MantenimientoOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(TablaVidaUtil));
    res[index].maintenance = parseInt(texto);
    SetTablaVidaUtil(res);
  };
  const GananciaOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(TablaVidaUtil));
    res[index].gain = parseInt(texto);
    SetTablaVidaUtil(res);
  };

  const Ejecutar = () => {
    let algoritmo = new ReemplazoEquiposLogic(
      TablaVidaUtil,
      PlazoProyecto,
      VidaUtil,
      CostoInicial,
      Ganancia
    );
    let solutionMatrix = algoritmo.execute();
    unstable_batchedUpdates(() => {
        SetMatrizSolucion(solutionMatrix);
        SetPlanes(algoritmo.getPlans(solutionMatrix)) ;
    });
   
  };
   const GuardarArchivo = () => {
    	var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
			JSON.stringify({
				"Plazo": PlazoProyecto,
				"VidaUtil": VidaUtil,
				"CostoInicial":CostoInicial,
				"Ganancia": Ganancia,
				"Tabla": TablaVidaUtil
			})
		));
		element.setAttribute('download', "reemplazodata.json");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
  };

  const ReiniciarEstados = ()=>{
    unstable_batchedUpdates(() => {
        SetPlazoProyecto(1)
        SetVidaUtil(1)
        SetGanancia(false)
        SetCostoInicial(0)
        SetMatrizSolucion([[0, 0, 0],[1, 0, 0],])
        SetTablaVidaUtil([{ year: 1, resale: 0, maintenance: 0, gain: 0 },])
        SetPlanes([])
    });
  }
 

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

  const loadFile = (file) => {
    unstable_batchedUpdates(() => {
        SetPlazoProyecto(file.Plazo)
        SetVidaUtil(file.VidaUtil)
        SetGanancia(file.Ganancia)
        SetTablaVidaUtil(file.Tabla)
        SetCostoInicial(file.CostoInicial)

    });
  };
   

  return (
    <Fragment>
      <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
        <div className="row">
          <div className="col-sm-4 card" style={{ height: "1000px" }}>
            <div style={{ display: "inline-block", marginBottom: "10px" }}>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                Costo Inicial:
              </p>
              <input
                style={{
                  padding: "0",
                  margin: "0",
                  display: "inline-block",
                  width: "100px",
                }}
                onChange={(e) => SetCostoInicial(parseInt(e.target.value))}
                value={CostoInicial}
              ></input>
            </div>

            <div className="number" style={{ marginBottom: "30px" }}>
              <h6
                style={{ padding: "0", margin: "0", display: "inline-block" }}
              >
                Plazo del proyecto:{" "}
              </h6>

              <button
                className="btn btn-dark"
                style={{ marginLeft: "10px" }}
                onClick={() => RemovePlazo()}
              >
                -
              </button>
              <input
                type="text"
                value={PlazoProyecto}
                style={{ width: "55px", height: "35px" }}
              />
              <button className="btn btn-dark" onClick={() => AddPlazo()}>
                +
              </button>
            </div>
            <div className="number" style={{ marginBottom: "30px" }}>
              <h6
                style={{ padding: "0", margin: "0", display: "inline-block" }}
              >
                Vida útil del equipo:{" "}
              </h6>

              <button
                className="btn btn-dark"
                style={{ marginLeft: "10px" }}
                onClick={() => RemoveLifeSpan()}
              >
                -
              </button>
              <input
                type="text"
                value={VidaUtil}
                style={{ width: "55px", height: "35px" }}
              />
              <button className="btn btn-dark" onClick={() => AddLifeSpan()}>
                +
              </button>
            </div>
            <div class="form-check form-switch">
              <label class="form-check-label" for="flexSwitchCheckChecked">
                Permitir el ingreso de ganancias
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={Ganancia}
                onChange={() => SetGanancia(!Ganancia)}
              ></input>
            </div>
            <div class="table-responsive" style={{ width: "90%" }}>
              <table class="table table-bordered table-sm ">
                <thead>
                  <tr>
                    <th scope="col">Año</th>
                    <th scope="col">Reventa</th>{" "}
                    <th scope="col">Mantenimiento</th>{" "}
                    <th scope="col">Ganancia</th>
                  </tr>
                </thead>
                <tbody>
                  {TablaVidaUtil.map((item, i) => {
                    return (
                      <tr>
                        <td>{item.year}</td>
                        <td style={{ width: "50px", height: "30px" }}>
                          <div key={uuidv4()}>
                            <input
                              defaultValue={item.resale}
                              type="text"
                              style={{ width: "75px", height: "30px" }}
                              onBlur={(e) => ReventaOnchange(e.target.value, i)}
                            ></input>{" "}
                          </div>
                        </td>
                        <td style={{ width: "50px", height: "30px" }}>
                          <div key={uuidv4()}>
                            <input
                              defaultValue={item.maintenance}
                              type="text"
                              style={{ width: "140px", height: "30px" }}
                              onBlur={(e) =>
                                MantenimientoOnchange(e.target.value, i)
                              }
                            ></input>{" "}
                          </div>
                        </td>
                        <td style={{ width: "50px", height: "30px" }}>
                          <div key={uuidv4()}>
                            <input
                              defaultValue={item.gain}
                              type="text"
                              style={{ width: "140px", height: "30px" }}
                              disabled={!Ganancia}
                              onBlur={(e) =>
                                GananciaOnchange(e.target.value, i)
                              }
                            ></input>{" "}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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

          <div className="col-sm-7 card" style={{ height: "1350px" }}>
            <div className="row">
              <div class="table-responsive col-sm-6" style={{ width: "40%" }}>
                <table class="table table-bordered table-sm ">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "30px" }}>
                        t
                      </th>
                      <th scope="col" style={{ width: "30px" }}>
                        G(t)
                      </th>
                      <th scope="col" style={{ width: "30px" }}>
                        Próximo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MatrizSolucion.map((item, i) => {
                      return (
                        <tr>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          {!Array.isArray(item[2]) && <td>{item[2]}</td>}
                          {Array.isArray(item[2]) && <td>{item[2].join()}</td>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div class="table-responsive col-sm-5">
                  <p>Planes:</p>
                  {Planes.map((item, i) => {
                    return (
                       <Fragment>
                            <p>Plan #{i + 1}</p>
                            <div >
                            {item.map((elemento, j) => {
                                return(
                                    <Fragment>
                                    {j!=0 && <i class="fas fa-arrow-right" style={{paddingRight:"3px",paddingLeft:"3px"}}></i>}
                                    <div class="numberCircle" style={{display:"inline-block"}}>{elemento}</div>
                                    </Fragment>

                                )
                            })}
                            </div>

                       </Fragment>
                    );
                  })}
              </div>
              </div>
          </div>
        </div>
      </div>
      <SideBar></SideBar>
    </Fragment>
  );
};

export default ReemplazoEquipos;
