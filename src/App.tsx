import MainPage from "./Components/MainPage/MainPage.js";
import UnderConstruction from "./Components/UnderConstruction/UnderConstruction.js";
import RutasMasCortas  from './Components/RutasMasCortas/RutasMasCortas.js'
import Mochila from './Components/Mochila/Mochila.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReemplazoEquipos from "./Components/ReemplazoEquipos/ReemplazoEquipos.js";
import SeriesDeportivas from "./Components/SeriesDeportivas/SeriesDeportivas.js";
const App =() => {
  return (
    <div className="App">
       <Router>
          <Switch>
              <Route exact path="/" component={MainPage}/>
              <Route exact path="/NotImplemented" component={UnderConstruction}/>
              <Route exact path="/RutasMasCortas" component={RutasMasCortas}/>
              <Route exact path="/Mochila" component={Mochila}/>
              <Route exact path="/ReemplazoEquipos" component={ReemplazoEquipos}/>
              <Route exact path="/SeriesDeportivas" component={SeriesDeportivas}/>

          </Switch>
        </Router>

    </div>
  );
}

export default App;
