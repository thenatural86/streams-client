import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// action creator
import { fetchStreams } from "../../actions"

class StreamList extends React.Component {
  // only want to call the action creator to fetch data one time so goes in componentDidMount
  componentDidMount() {
    this.props.fetchStreams()
  }

  // helper method to render edit/delete buttons if the stream belongs to the current user
  renderAdmin = stream => {
    // if the userId of the stream is equal to the id of the current user render these buttons
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* navigate user to edit component using the stream id with Link tag styled as a button */}
          <Link to={`streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          {/* navigate user to delete component using the stream id with Link tag styled as a button */}
          <Link
            to={`streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      )
    }
  }

  // helper method to render the list of streams
  renderList = () => {
    // streams is array passed down via msp gets mapped over.
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {/* render buttons on list if the stream belongs to the user */}
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {/* navigate user to the stream the user clicks on */}
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      )
    })
  }

  // helper method to render create stream button if the user is signed in via google O-auth
  renderCreate() {
    // if the user is signed in render the link (styled as a button) to the stream create page.
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Streams</h3>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

// data that is being made available to this component via react-redux msp
const mapStateToProps = state => {
  return {
    // streams is stored as an object, so turn it into array so that can be easily mapped over. Object.values takes an object as an argument (state.streams), and turns all the values in the object into an array called streams, which can be found in the components props (this.props.streams).
    streams: Object.values(state.streams),
    // get the user id out of redux store and assign to currentUserId
    currentUserId: state.auth.userId,
    // isSignedIn property from the auth object in redux store
    isSignedIn: state.auth.isSignedIn
  }
}
// connect the fetchStreams action creator
export default connect(mapStateToProps, { fetchStreams })(StreamList)
