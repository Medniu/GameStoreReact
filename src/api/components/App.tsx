import { Route, Switch, Redirect } from "react-router-dom";
import { ReactElement } from "react";
import Home from "./Home/Home";
import Products from "./Products/Products";
import About from "./About/About";
import Login from "../users/Login/Login";
import Register from "../users/Registration/Registration";
import "../../styles/global.css";

function App(): ReactElement {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/About" component={About} />
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route render={() => <Redirect to={{ pathname: "/" }} />} />
    </Switch>
  );
}

export default App;
