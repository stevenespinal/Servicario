import {combineReducers, createStore} from "redux";
import servicesReducer from "../reducers";

const logger = store => nextDispatch => action => {
  console.group(action.type);
  console.log(`%c prev state`, `color: red`, store.getState());
  console.log(`%c action`, `color: green`, action);
  const returnValue = nextDispatch(action);
  console.log(`%c next state`, `color: orange`, store.getState());
  // console.log(returnValue);
  console.groupEnd(action.type);
  return returnValue;
}


const promise = store => nextDispatch => action => {
  if (typeof action.then === 'function') {
    return action.then(nextDispatch);
  }
  return nextDispatch(action);
}


const applyMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
}

const initStore = () => {
  const middlewares = [promise];
  const serviceApp = combineReducers({
    service: servicesReducer
  });

  const browserSupport = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(serviceApp, browserSupport);
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  applyMiddlewares(store, middlewares);

  return store;
}

export default initStore;


