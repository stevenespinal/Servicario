import {createStore, applyMiddleware, compose} from "redux";
import serviceApp from "../reducers";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";

const initStore = () => {
  const middlewares = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose;
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  return createStore(serviceApp, composeEnhancers(applyMiddleware(...middlewares)));
}

export default initStore;


