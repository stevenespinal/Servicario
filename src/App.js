import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
import {Provider} from "react-redux";
import initStore from "./store";
import ServiceApp from "./ServiceApp";

const store = initStore();

function App() {
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

export default App;
