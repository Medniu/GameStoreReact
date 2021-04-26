import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import React, { ReactElement } from "react";
import Home from "./Home/Home";
import Products from "./Products/Products";
import About from "./About/About";
import Alert from "./Alert/Alert";
import "../../styles/global.css";
import ProfilePage from "./ProfilePage/ProfilePage";
import PrivateRoute from "./Route/PrivateRoute";

type State = {
  hasError: boolean;
};

type AppProps = RouteComponentProps;

class App extends React.Component<AppProps, State> {
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
          <Route exact path="/" component={() => <Home />} />
          <PrivateRoute path="/products/:category" pageComponent={Products} />
          <PrivateRoute path="/About" pageComponent={About} />
          <PrivateRoute path="/profile" pageComponent={ProfilePage} />
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
