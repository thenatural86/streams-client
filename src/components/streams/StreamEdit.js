import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
// action creator imports
import { fetchStream, editStream } from "../../actions/index"
import StreamForm from "./StreamForm"

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = formValues => {
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
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)
