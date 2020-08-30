import React, {Component} from "react";
import {connect} from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Spinner from "./components/Spinner";
import {logout} from "./actions";

class ServiceApp extends Component {

  handleLogOut = uid => {
    this.props.logout(uid);
  }

  renderApplication = auth => (
    <>
      <Navbar loadFresh id="navbar-main" auth={auth} logout={() => this.handleLogOut(auth.user.uid)}/>
      <Navbar id="navbar-clone" auth={auth} logout={() => this.handleLogOut(auth.user.uid)}/>
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

export default connect(mapStateToProps, {logout})(ServiceApp)