// from axios api sever
import streams from "../apis/streams"
// allow us to programmatically navigate user around app
import history from "../history"

//
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types"

// action creators

// send action  of sign in to update boolean status of isSignedIn to true, receives google userId as an argument and is added to action on the payload property
export const signIn = userId => {
  return { type: SIGN_IN, payload: userId }
}

// updates boolean status of isSignedIn to false
export const signOut = () => {
  return { type: SIGN_OUT }
}

// asynchronous create stream action creator.
// Called with a list of values from the form as an argument, and return async function. This function gets called automatically by redux thunk with two arguments, the dispatch and getState functions.
// getState allows us to reach into redux store and pull out a piece of data
export const createStream = formValues => async (dispatch, getState) => {
  // getState() returns the entire state object, then access the auth piece of state and destructure out userId
  const { userId } = getState().auth
  // response from api server with form values of stream that was just created by user and the users ID so we can identify if this stream belongs to the current user and do some conditional rendering
  const response = await streams.post("/streams", { ...formValues, userId })

  // dispatch of action with create stream type and a payload of the streams data
  dispatch({ type: CREATE_STREAM, payload: response.data })
  // Do some programmatic navigation to get user back to root route after we dispatch the action
  history.push("/")
}

// get request for all streams
export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams")

  dispatch({ type: FETCH_STREAMS, payload: response.data })
  // console.log(response.data)
}

// get request for single stream, id of stream passed in
export const fetchStream = id => async dispatch => {
  // id of the stream we are trying to fetch
  const response = await streams.get(`/streams/${id}`)

  dispatch({ type: FETCH_STREAM, payload: response.data })
}

// patch request to edit stream with id of stream and edit that we are trying to make passed in
export const editStream = (id, formValues) => async dispatch => {
  // id of stream we are trying to edit and the changes to stream
  // use PATCH request instead of PUT to update only some properties instead of all the properties
  const response = await streams.patch(`/streams/${id}`, formValues)

  dispatch({ type: EDIT_STREAM, payload: response.data })

  // programmatically navigate user back to root route
  history.push("/")
}

// delete request with id of stream we want to delete
export const deleteStream = id => async dispatch => {
  // no response, delete request of id
  await streams.delete(`/streams/${id}`)

  // id of stream as payload
  dispatch({ type: DELETE_STREAM, payload: id })
  // programmatically navigate user back to root route
  history.push("/")
}
