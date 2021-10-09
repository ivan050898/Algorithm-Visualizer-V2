import { Fragment } from "react";
import "./SeriesDeportivas.css";

import SideBar from "../SideBar/SideBar.js";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { useFilePicker } from "use-file-picker";
import { SeriesDeportivasLogic } from "./Logic/SeriesDeportivasLogic";

const SeriesDeportivas = () => {
  const [Ph, SetPh] = useState(0);
  const [Pr, SetPr] = useState(0);
  const [Qh, SetQh] = useState(100);
  const [Qr, SetQr] = useState(100);
  const [MatrizSolucion, SetMatrizSolucion] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [ListaJuegos, SetListaJuegos] = useState([1]);
  const [NumeroJuegos, SetNumeroJuegos] = useState(1);
  
  const addMaxGames = () =>  {
    if(NumeroJuegos<11){

      let ListaDejuegosNueva = JSON.parse(JSON.stringify(ListaJuegos));
      ListaDejuegosNueva.push(1);
      ListaDejuegosNueva.push(1);    
      SetListaJuegos(ListaDejuegosNueva)
      let MatrizSolucionNueva = JSON.parse(JSON.stringify(MatrizSolucion));
      MatrizSolucionNueva.forEach(row => {
        row.push("");
      });
      MatrizSolucionNueva.push(new Array((((NumeroJuegos+2) + 1) / 2) + 1).fill(""));
      SetNumeroJuegos(NumeroJuegos+2);
      SetMatrizSolucion(MatrizSolucionNueva)

    }
   
  }

  const removeMaxGames = () =>  {
    if(NumeroJuegos>1){
      let ListaDejuegosNueva = JSON.parse(JSON.stringify(ListaJuegos));
      ListaDejuegosNueva.pop();
      ListaDejuegosNueva.pop();    
      SetListaJuegos(ListaDejuegosNueva)
      let MatrizSolucionNueva = JSON.parse(JSON.stringify(MatrizSolucion));
      MatrizSolucionNueva.pop(); 
      MatrizSolucionNueva.forEach(row => {
        row.pop(); 
      });
      SetNumeroJuegos(NumeroJuegos-2);
      SetMatrizSolucion(MatrizSolucionNueva)
    } 
  }


  const CalcularQr = (value) =>  {
    setTimeout(() => {
      let ph=25
      let qr=0
      if (parseInt(value) > 100) {
         ph = 100;
      } 
      else if (parseInt(value) < 0 || value == "") {
        ph = 0;
      }
      ph=parseInt(value)
      qr = 100-ph
      SetPh(ph)
      SetQr(qr)
  
    }, 25);
    


  }
  const CalcularQh= (value) =>  {
    setTimeout(() => {
      let pr=25
      let qh=0
      if (parseInt(value) > 100) {
        pr = 100;
      } 
      else if (parseInt(value) < 0 || value == "") {
        pr = 0;
      }
      pr=parseInt(value)
      qh = 100-pr
      SetPr(pr)
      SetQh(qh)
  
    }, 25);

  }

  const SwitchOnChange= (index) =>  {
    let ListaDejuegosNueva = JSON.parse(JSON.stringify(ListaJuegos));
    ListaDejuegosNueva[index]=ListaDejuegosNueva[index]==1?0:1
    SetListaJuegos(ListaDejuegosNueva)
  }

  const Ejecutar = () => {
    let algoritmo = new SeriesDeportivasLogic(NumeroJuegos,Ph,Pr,ListaJuegos);
    unstable_batchedUpdates(() => {
        SetMatrizSolucion(algoritmo.execute());
    });
   
  };

   const GuardarArchivo = () => {
    	var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
			JSON.stringify({
				"Juegos": NumeroJuegos,
				"ph": Ph,
				"pr":Pr,
				"formato": ListaJuegos
			})
		));
		element.setAttribute('download', "SeriesDeportivas.json");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
  };

  const ReiniciarEstados = ()=>{
    unstable_batchedUpdates(() => {
      SetPh(0)
      SetPr(0)
      SetQh(100)
      SetQr(100)
      SetNumeroJuegos(1)
      SetListaJuegos([1]);
      SetMatrizSolucion([
        ["", ""],
        ["", ""],
      ])
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
        SetPh(file.ph)
        SetPr(file.pr)
        SetQr(100-file.ph)
        SetQh(100-file.pr)
        SetNumeroJuegos(file.Juegos)
        SetListaJuegos(file.formato)
    });
  };
   

  return (
    <Fragment>
      <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
        <div className="row">
          <div className="col-sm-4 card" style={{ height: "1000px" }}>
            <div className="number" style={{ marginBottom: "30px" }}>
              <h6
                style={{ padding: "0", margin: "0", display: "inline-block" }}
              >
                Número de juegos :{" "}
              </h6>

              <button className="btn btn-dark" style={{ marginLeft: "10px" }} onClick={()=>removeMaxGames()}>
                -
              </button>
              <input type="text" style={{ width: "55px", height: "35px" }}  value={NumeroJuegos}/>
              <button className="btn btn-dark" onClick={()=>addMaxGames()}>+</button>
            </div>

            <div style={{ display: "inline-block", marginBottom: "10px" }}>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                Ph (%):
              </p>
              <input
                style={{
                  padding: "0",
                  margin: "0",
                  display: "inline-block",
                  width: "100px",
                  marginRight:"100px"
                }}
                onChange={(e) => CalcularQr(e.target.value)
                }
                value={Ph}

              ></input>
               <p style={{ display: "inline-block", marginRight: "10px" }}>
                Pr (%):
              </p>
              <input
                style={{
                  padding: "0",
                  margin: "0",
                  display: "inline-block",
                  width: "100px",
                }}
                value={Pr}

                onChange={(e) =>
                  CalcularQh(e.target.value)
                }
              ></input>
            </div>
            <div style={{ display: "inline-block", marginBottom: "10px" }}>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                Qr (%):
              </p>
              <input
                style={{
                  padding: "0",
                  margin: "0",
                  display: "inline-block",
                  width: "100px",
                  marginRight:"100px"
                }}
                disabled={true}
                value={Qr}

              ></input>
               <p style={{ display: "inline-block", marginRight: "10px" }}>
                Qh (%):
              </p>
              <input
                style={{
                  padding: "0",
                  margin: "0",
                  display: "inline-block",
                  width: "100px",
                }}
                value={Qh}

                disabled={true}
              ></input>
            </div>
            <div>
                <p>Configuración del juego:</p>
                
                {ListaJuegos.map((item,i)=>{
                  return(
                    <div class="form-group" key={uuidv4()}  style={{marginTop:"15px"}}>
                        <label  for={"sw"+i} ><p style={{marginBottom:"2px"}}>Juego <strong>#{i + 1} &#x2192; </strong></p></label>
                        <div class="form-check form-switch" id={"sw"+i} style={{ display: "inline-block", marginLeft: "2px",marginBottom:"-5px" }}>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={ListaJuegos[i]}
                            onChange={() => SwitchOnChange(i)}
                          ></input>
                          <p>{ListaJuegos[i]==1?"Casa":"Visita"}</p>
                      </div>
                  </div>

                )})}
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
          <div class="table-responsive" style={{ width: "90%" }}>
                <table class="table table-bordered table-sm ">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "50px", height: "30px"}}>
                       {""}
                      </th>
                      {MatrizSolucion.map((item, i) => {
                        return (
                          <th
                            scope="col"
                            style={{ width: "50px", height: "30px" ,backgroundColor:"#ffd639"}}
                          >
                            {i}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {MatrizSolucion.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row" style={{backgroundColor:"#35FF69"}}>{i}</th>
                          {MatrizSolucion.map((item, j) => {
                            return (
                              <td style={{ width: "50px", height: "30px" ,backgroundColor: (i==j && i==MatrizSolucion.length-1)? '#008080': '#FFFFFF'}}>
                                <div key={uuidv4()} >
                                  {i==0 && j==0 && <p>{"-"}</p>}
                                  {(i!=j || i>0) && (i) && <p >{MatrizSolucion[i][j]}</p>}

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
          </div>
        </div>
      </div>
      <SideBar></SideBar>
    </Fragment>
  );
};

export default SeriesDeportivas;
