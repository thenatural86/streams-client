import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
// action creator imports
import { fetchStream, editStream } from "../../actions/index"
import StreamForm from "./StreamForm"

// props (history, location and match)passed down from react router dom Route tag
class StreamEdit extends React.Component {
  //fetches data for the stream we want to edit
  componentDidMount() {
    // fetchStream action creator with id of stream we want to edit passed in
    this.props.fetchStream(this.props.match.params.id)
  }

  // callback function that gets passed down to StreamForm
  // receives formValues
  onSubmit = formValues => {
    // edit stream action creator called with id of stream and formValues
    this.props.editStream(this.props.match.params.id, formValues)
  }

  render() {
    console.log(this.props)
    // conditional check to avoid undefined error
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* render StreamForm component */}
        <StreamForm
          // specify initialValues prop from redux form
          // pass in the stream object from this.props.stream
          // .pick() from lodash picks out the values that we specify ("title", "description") from the this.props.stream object
          initialValues={_.pick(this.props.stream, "title", "description")}
          // onSubmit callback
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

// gets called with two arguments, our state object and ownProps which is a reference to the props object (from react-router-dom library) that shows up in our edit stream component
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  // return a object that has a stream property
  // use ownProps [] notation to select the appropriate stream from the streams piece of state in redux store and assign it to stream
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

//connect fetchStream and editStream action creator
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)
