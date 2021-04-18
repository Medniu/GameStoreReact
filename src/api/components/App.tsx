import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import React, { ReactElement } from "react";
import Home from "./Home/Home";
import Products from "./Products/Products";
import About from "./About/About";
import Login from "../users/Login/Login";
import Register from "../users/Registration/Registration";
import Alert from "./Alert/Alert";
import "../../styles/global.css";

type AlertState = {
  hasError: boolean;
};

type AppProps = RouteComponentProps;

class App extends React.Component<AppProps, AlertState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  handleAlertState = (hasError: boolean) => {
    this.setState({ hasError });
    this.props.history.push("/");
  };

  render(): ReactElement {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:category" component={Products} />
          <Route path="/About" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
        {this.state.hasError && (
          <Alert
            title="Error Title"
            hasError={this.state.hasError}
            errorMessage="Some Error"
            setActive={this.handleAlertState}
          />
        )}
      </>
    );
  }
}
export default withRouter(App);
