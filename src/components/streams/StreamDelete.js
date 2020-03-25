import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Modal from "../Modal"
import history from "../../history"
import { fetchStream, deleteStream } from "../../actions/index"

class StreamDelete extends React.Component {
  // call the fetchStream action creator to load the data of the stream we want to delete
  componentDidMount() {
    // console.log(this.props)
    // get id of stream from the match object
    this.props.fetchStream(this.props.match.params.id)
  }

  // renders buttons that are passed down to modal
  renderActions() {
    // destructed out from props.match.params
    const { id } = this.props.match.params

    return (
      // fragment to work around styling
      <>
        <button
          // onClick handler that calls deleteStream action creator with id
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        {/* link to root route styles as button */}
        <Link to={"/"} className="ui button">
          Cancel
        </Link>
      </>
    )
  }

  // content passed down to modal
  renderContent = () => {
    // if there is no stream data initially render this message
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?"
    }
    // render this message once data is loaded
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`
  }

  render() {
    return (
      // render the modal
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        // behavior to navigate user to root route (via history object) when user wants to dismiss the modal
        onDismiss={() => history.push("/")}
      />
    )
  }
}
// get called with state and ownProps (same props object that is passed to component). Allows us to look at match property and pull out id of stream.
const mapStateToProps = (state, ownProps) => {
  // return object with key of stream and value of the id of the stream we want to delete
  return { stream: state.streams[ownProps.match.params.id] }
}

// connect action creators and msp
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
)
