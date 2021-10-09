import './MainPage.css'
import {Fragment} from 'react'
import { useHistory } from "react-router-dom";

 const MainPage = () => {
    const TooltipFloyd="Encuentra la ruta más corta entre 2 nodos de un grafo por medio de una matríz"
    const TooltipMochila="Detalla el set óptimo y de objetos  su cantidad  para llevar en una mochila"
    const TooltipEquipos="Encuentra la secuencia de reemplazos óptima para minimizar costos "
    const TooltipArboles="Encuentra el árbol binario de búsqueda óptimo dado un conjunto de llaves y sus probabilidades de búsqueda"
    const TooltipSeries="En cuentra la probabilidad de que un equipo Gane dada ciertas probabilidades de ganar en casa o visita"

    const TooltipMulti="Encuentra la secuencia de multiplicación de matrices que menos multiplicaciones requiere"

    const history = useHistory();

    const Redirect = () =>{
      history.push('/NotImplemented');
    }
    const RutasMasCortas = () =>{
      history.push('/RutasMasCortas');
    }

    const Mochila = () =>{
      history.push('/Mochila');
    }
    const ReemplazoEquipos = () =>{
      history.push('/ReemplazoEquipos');
    }
    const SeriesDeportivas = () =>{
      history.push('/SeriesDeportivas');
    }
    
    return (
        <Fragment>
            <div class="container">
              <img src={`${process.env.PUBLIC_URL}/logo.png` } style={{paddingLeft:"500px",paddingBottom:"100px"}} ></img>
              <div class="row">
                <button className="btn btn-lg CircularButton1" onClick={RutasMasCortas} data-bs-toggle="tooltip" data-bs-placement="top" title={TooltipFloyd}> 
                <i class="fas fa-route fa-3x"></i>
                Rutas más cortas</button>
                <button className="btn btn-lg CircularButton2" data-bs-toggle="tooltip" data-bs-placement="top" title={TooltipMochila}  onClick={Mochila}><i class="fas fa-hiking fa-3x"></i>Problema de la Mochila</button>
                <button className="btn btn-lg CircularButton3" data-bs-toggle="tooltip" data-bs-placement="top" title={TooltipEquipos} onClick={ReemplazoEquipos}><i class="fas fa-sync-alt fa-3x"></i>Reemplazo de Equipos</button>
               
               </div>
               <div class="row">       
                 <button className="btn btn-lg CircularButton4" data-bs-toggle="tooltip" data-bs-placement="top" title={TooltipArboles} onClick={Redirect}><i class="fas fa-network-wired fa-3x"></i>Árboles Binarios de Búsqueda Óptimos </button>

                <button className="btn btn-lg CircularButton5" data-bs-toggle="tooltip" data-bs-placement="top" title={TooltipSeries}  onClick={SeriesDeportivas}><i class="fas fa-football-ball fa-3x"></i>Series deportivas</button>

                <button className="btn btn-lg CircularButton6" data-bs-toggle="tooltip" data-bs-placement="top" title={TooltipMulti} onClick={Redirect}><i class="fas fa-calculator fa-3x"></i>Multiplicación de Matrices</button>        
               </div>
            </div>
         


        </Fragment>
    )
}

export default MainPage;
