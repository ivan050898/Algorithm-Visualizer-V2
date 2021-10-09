import "./SideBar.css";
import { Fragment } from "react";
const SideBar = () => {
  return (
    <Fragment>
      <div>
        <input type="checkbox" id="menu_active" defaultChecked />
        <div id="wrapper" className="active">
          <div id="menu">
            <span id="site-name" style={{ paddingLeft: "160px" }}>
              <label htmlFor="menu_active">
                <i className="fa fa-arrow-left"></i>
                <i className="fa fa-bars"></i>
              </label>
            </span>
            <ul>
              <a href="/RutasMasCortas">
                <li>
                  Rutas mas cortas <i class="fas fa-route"></i>
                </li>
              </a>
              <a href="/Mochila">
                <li>
                  Problema Mochila <i class="fas fa-hiking "></i>
                </li>
              </a>
              <a href="/ReemplazoEquipos">
                <li>
                  Reemplazo Equipos<i class="fas fa-sync-alt "></i>
                </li>
              </a>
              <a href="/NotImplemented">
                <li>
                  Arboles binarios<i className="fas fa-network-wired"></i>
                </li>
              </a>
              <a href="/SeriesDeportivas">
                <li>
                  Series deportivas<i className="fas fa-football-ball"></i>
                </li>
              </a>
              <a href="/NotImplemented">
                <li>
                  Matrices<i className="fas fa-calculator "></i>
                </li>
              </a>
              <a href="/">
                <li>
                  Menú Principal<i class="fas fa-home"></i>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;