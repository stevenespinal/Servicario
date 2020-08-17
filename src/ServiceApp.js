import React, {Component} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

class ServiceApp extends Component {

  renderApplication = () => (
    <>
      <Navbar/>
      <Navbar id="navbar-clone"/>
      <Sidebar/>
      <Routes/>
    </>
  );

  render() {
    return this.renderApplication();
  }
}

export default ServiceApp