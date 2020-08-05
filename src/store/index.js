import {combineReducers, createStore} from "redux";
import servicesReducer from "../reducers";

const addLoggerToDispatch = store => {
  const initDispatch = store.dispatch;

  return action => {
    console.group(action.type);
    console.log(`%c prev state`, `color: red`, store.getState());
    console.log(`%c action`, `color: green`, action);
    const returnValue = initDispatch(action);
    console.log(`%c next state`, `color: orange`, store.getState());
    // console.log(returnValue);
    console.groupEnd(action.type);
    return returnValue;
  }
}

const addPromiseToDispatch = store => {
  const initDispatch = store.dispatch;
  return action => {
    if (typeof action.then === 'function') {
      return action.then(initDispatch);
    }

    return initDispatch(action);
  }
}

const initStore = () => {
  const serviceApp = combineReducers({
    service: servicesReducer
  });

  const browserSupport = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(serviceApp, browserSupport);
  if (process.env.NODE_ENV !== 'production') store.dispatch = addLoggerToDispatch(store);
  store.dispatch = addPromiseToDispatch(store)
  return store;
}

export default initStore;


