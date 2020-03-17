import React from "react"
import { connect } from "react-redux"
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
            // isSignedIn is a property on the google auth object and can call get() to find out if you is signed in
            this.onAuthChange(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChange)
          })
      }
    )
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

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
        <button className="ui red google button " onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      )
      // otherwise user is signed out and return sign in button
    } else {
      return (
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

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
