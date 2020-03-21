import { combineReducers } from "redux"
// alias reducer as formReducer
import { reducer as formReducer } from "redux-form"
import authReducer from "./authReducer"
import streamReducer from "./streamReducer"

// combine all of the reducers
export default combineReducers({
  // authReducer file assigned to key of auth
  auth: authReducer,

  // formReducer file assigned to key of form from redux-form library
  form: formReducer,

  // streamsReducer file assigned to key of streams
  streams: streamReducer
})
