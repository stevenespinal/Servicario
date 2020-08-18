import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
import {Provider} from "react-redux";
import initStore from "./store";
import ServiceApp from "./ServiceApp";
import {onAuthStateChanged, storeAuthUser} from "./actions";

const store = initStore();

class App extends Component {

  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      console.log(authUser);
      store.dispatch(storeAuthUser(authUser));
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
  }


  render() {
    return (
      <Provider store={store}>
        <ToastProvider>
          <Router>
            <ServiceApp/>
          </Router>
        </ToastProvider>
      </Provider>
    );
  }
}

export default App;
