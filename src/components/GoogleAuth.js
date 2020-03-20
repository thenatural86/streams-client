import React from "react"
import { connect } from "react-redux"
// action creators
import { signIn, signOut } from "../actions/index"

class GoogleAuth extends React.Component {
  // load up gapi library one time
  componentDidMount() {
    // google api library available inside of window scope inside of browser
    window.gapi.load(
      "client:auth2",
      // callback function for when google library has finished loading
      () => {
        // asynchronously initialize authentication client with clientId and scope of email
        window.gapi.client
          .init({
            clientId:
              "784716658380-04ei9l3s5cf7qku6moa3o104gi63dms2.apps.googleusercontent.com",
            scope: "email"
          })
          // promise returned
          .then(() => {
            // reference to auth object saved on component class
            this.auth = window.gapi.auth2.getAuthInstance()
            // isSignedIn is a property on the google auth object and can call get() to find out if you is signed in.
            // onAuthChange with users current authentication status
            this.onAuthChange(this.auth.isSignedIn.get())
            // call the listen method on the isSignedIn prototype. Pass in a reference to the onAuthChange Callback function.
            this.auth.isSignedIn.listen(this.onAuthChange)
          })
      }
    )
  }

  // callback function for anytime authentication status changes according to GAPI
  // gets called with boolean argument (isSignedIn of either true/false)
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      // call signIn action creator
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      // call signOut action creator
      this.props.signOut()
    }
  }

  // sign in helper that calls the auth instance and invokes singIn method
  onSignInClick = () => {
    this.auth.signIn()
  }

  // sign out helper, calls the auth instance and invokes signOut method
  onSignOutClick = () => {
    this.auth.signOut()
  }

  // helper method to render singed in button
  renderAuthButton = () => {
    // conditionally render null if isSignedIn is null
    if (this.props.isSignedIn === null) {
      return null
      // if user is signed in return sign out button
    } else if (this.props.isSignedIn === true) {
      return (
        // renders sign out button with onSignOutClick
        <button className="ui red google button " onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      )
      // otherwise user is signed out and return sign in button
    } else {
      return (
        // renders sign out button with onSignInClick
        <button className="ui red google button " onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

// called with state object
const mapStateToProps = state => {
  // return an object with a property of isSingedIn, that has value of state.auth.isSignedIn (nul, true or false)
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
