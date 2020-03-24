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
    // return a new state object via spread operator(...)
    // then call .mapKeys() from lodash, then take the list of stream which we got back from our API (action.payload) and create an object out of it using .mapKeys(). The keys of that object are the id's of the individual streams themselves.
    // ..._.mapKeys() takes all the key/value pairs from the big object that it creates and adds them into the new object that gets created
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") }

    // return a new state object via the spread operator(...)
    // The string that we want to add into the object is on the action.payload property and add the id onto that property using key interpolation - [action.payload.id]
    // assigned s value of action.payload
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }

    //Use the .omit() from the lodash library to return entire state object, with the key that we want to remove from the object. The payload that gets dispatched from the delete stream action creator is the id
    case DELETE_STREAM:
      return _.omit(state, action.payload)
    // default case
    default:
      return state
  }
}
