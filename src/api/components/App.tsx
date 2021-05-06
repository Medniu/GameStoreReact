import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import React, { ReactElement, Suspense } from "react";
import Home from "./Home/Home";
import Alert from "./Alert/Alert";
import "../../styles/global.css";
import PrivateRoute from "./Route/PrivateRoute";

const Products = React.lazy(() => import("./Products/Products"));
const About = React.lazy(() => import("./About/About"));
const ProfilePage = React.lazy(() => import("./ProfilePage/ProfilePage"));
const ShoppingCart = React.lazy(() => import("./ShoppingCart/ShoppingCart"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <PrivateRoute path="/products/:category" pageComponent={Products} />
            <PrivateRoute path="/About" pageComponent={About} />
            <PrivateRoute path="/profile" pageComponent={ProfilePage} />
            <PrivateRoute path="/cart" pageComponent={ShoppingCart} />
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
        </Suspense>
      </>
    );
  }
}
export default withRouter(App);
