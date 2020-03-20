import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import authReducer from "./authReducer"
import streamReducer from "./streamReducer"

//
export default combineReducers({
  // authReducer file assigned to key of auth
  auth: authReducer,

  // formReducer file assigned to key of form
  form: formReducer,

  // streamsReducer file assigned to key of streams
  streams: streamReducer
})
