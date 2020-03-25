import React from "react"
import { connect } from "react-redux"
import { createStream } from "../../actions"
import StreamForm from "./StreamForm"

class StreamCreate extends React.Component {
  // callback function for when form is submitted
  // don't need to call e.preventDefault() b/c redux form takes care of it
  // argument of formValues passed in
  onSubmit = formValues => {
    // calls createStream action creator with formValues argument anytime user submits the form
    this.props.createStream(formValues)
  }

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        {/* callback function passed down to stream form */}
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

// connect createStream action creator
export default connect(null, { createStream })(StreamCreate)
