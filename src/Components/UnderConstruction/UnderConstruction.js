import { Fragment } from  'react';
import { useHistory } from "react-router-dom";

import "./UnderConstruction.css"





const UnderConstruction = () => {
    const history = useHistory();

    const Redirect = () =>{
        history.push('/');
    }
    return(
        <Fragment>
            <div> <img  src={`${process.env.PUBLIC_URL}/workers1.png` } width="500" height="500"  style={{display:'block',marginLeft:"auto",marginRight:"auto"}}></img></div>
            <h2 className="Mycenter">¡Esta funcionalidad se encuentra bajo construcción!</h2>
            <h4 className="Mycenter">Te invitamos a navegar otras funcionalidades de nuestra aplicación :D</h4>
            <button className="btn" style={{backgroundColor:"teal",color:"white",marginLeft:"830px",marginTop:"60px"}} onClick={Redirect}>Volver al menú principal</button>
        </Fragment>

    )
}

export default UnderConstruction