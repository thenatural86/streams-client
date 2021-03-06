// imported types
import { SIGN_IN, SIGN_OUT } from "../actions/types"

// initial values for state object
const INITIAL_STATE = {
  isSignedIn: null,
  // keep track of user through google auth(google id), so app can keep track of user who created stream.
  // initialized as null
  userId: null
}

// initial state object passed in
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // create a new object,take all values out of state argument and put into new object, update isSignedIn state property to true
    case SIGN_IN:
      // value for userId property comes from action.payload
      return { ...state, isSignedIn: true, userId: action.payload }
    // create a new object,take all values out of state argument and put into new object, update isSignedIn state property to false
    case SIGN_OUT:
      // clear userId on sign out
      return { ...state, isSignedIn: false, userId: null }
    default:
      return state
  }
}
