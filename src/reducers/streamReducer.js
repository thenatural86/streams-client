// lodash library
import _ from "lodash"

// import of types from action.types file
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types"

// default state to an empty object
export default (state = {}, action) => {
  switch (action.type) {
    // getting back an array of records that we want to merge into the state object
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") }

    case FETCH_STREAM:
      // return a new state object via the spread operator(...)
      // The string that we want to add into the object is on the action.payload property and add the id onto that property using key interpolation - [action.payload.id]
      // assigned s value of action.payload
      return { ...state, [action.payload.id]: action.payload }
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_STREAM:
      return _.omit(state, action.payload)
    default:
      return state
  }
}
