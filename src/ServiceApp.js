import React, {Component} from "react";
import {connect} from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Spinner from "./components/Spinner";
import {logout} from "./actions";

class ServiceApp extends Component {


  handleLogOut = () => {

    this.props.dispatch(logout())
  }

  renderApplication = auth => (
    <>
      <Navbar auth={auth} logout={this.handleLogOut}/>
      <Navbar id="navbar-clone" auth={auth} logout={this.handleLogOut}/>
      <Sidebar/>
      <Routes/>
    </>
  );


  render() {
    const {auth} = this.props;
    return auth.isAuthResolved ? this.renderApplication(auth) : <Spinner/>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ServiceApp)