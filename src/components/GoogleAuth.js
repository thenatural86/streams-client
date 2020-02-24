import React from "react"

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "784716658380-04ei9l3s5cf7qku6moa3o104gi63dms2.apps.googleusercontent.com",
        scope: "email"
      })
    })
  }

  render() {
    return <div>Google Auth</div>
  }
}

export default GoogleAuth
