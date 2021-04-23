import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import React, { ReactElement } from "react";
import Home from "./Home/Home";
import Products from "./Products/Products";
import About from "./About/About";
import Alert from "./Alert/Alert";
import "../../styles/global.css";
import ProfilePage from "./ProfilePage/ProfilePage";

type State = {
  hasError: boolean;
  user: User | null;
};

type User = {
  photo: string;
  name: string;
  address: string;
  phoneNumber: string;
};

type AppProps = RouteComponentProps;

class App extends React.Component<AppProps, State> {
  constructor(props: AppProps) {
    super(props);
    this.state = { hasError: false, user: null };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  handleUserState = (user: User | null) => {
    this.setState({ user });
  };

  handleAlertState = (hasError: boolean) => {
    this.setState({ hasError });
    this.props.history.push("/");
  };

  render(): ReactElement {
    return (
      <>
        <Switch>
          <Route exact path="/" component={() => <Home user={this.state.user} setUser={this.handleUserState} />} />
          <Route
            path="/products/:category"
            component={() => <Products user={this.state.user} setUser={this.handleUserState} />}
          />
          <Route path="/About" component={() => <About user={this.state.user} setUser={this.handleUserState} />} />
          <Route
            path="/Profile"
            component={() => <ProfilePage user={this.state.user} setUser={this.handleUserState} />}
          />
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
