import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import {Provider} from "react-redux";
import initStore from "./store";

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Navbar id="navbar-clone"/>
        <Sidebar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route exact path="/services" component={Services}/>
          <Route path="/services/:id" component={ServiceDetail}/>
          <Route path="/faq" component={Faq}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
