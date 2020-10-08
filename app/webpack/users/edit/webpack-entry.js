import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from "redux";

import profileReducer, { fetchUserProfile } from "./ducks/profile";
import AppContainer from "./containers/app_container";

const rootReducer = combineReducers( {
  profile: profileReducer
} );

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    // enable Redux DevTools if available
    window.devToolsExtension ? window.devToolsExtension() : applyMiddleware()
  )
);

store.dispatch( fetchUserProfile( ) );

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById( "app" )
);