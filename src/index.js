import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import reduxThunk from "redux-thunk"

import App from "./components/App"
import reducers from "./reducers"

// allows use of redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// creation of store which holds the state of the app
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

// wrap the whole app in Provider which passes the store down in props
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
)
