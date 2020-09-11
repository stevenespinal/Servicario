import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
import {Provider} from "react-redux";
import initStore from "./store";
import ServiceApp from "./ServiceApp";
import {onAuthStateChanged, storeAuthUser, subscribeToMessages, checkUserConnection} from "./actions";

const store = initStore();

class App extends Component {

  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser));
      if (authUser) {
        checkUserConnection(authUser.uid);
        this.unsubscribeMessages = store.dispatch(subscribeToMessages(authUser.uid));
      }
      if (!authUser) {
        this.unsubscribeMessages && this.unsubscribeMessages();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
    this.unsubscribeMessages();
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
