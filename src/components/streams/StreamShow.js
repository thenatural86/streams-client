import React from "react"
// library used to access live stream
// flv downloads video stream and converts to file that can be played in html video player
import flv from "flv.js"
import { connect } from "react-redux"
import { fetchStream } from "../../actions/index"

class StreamShow extends React.Component {
  constructor(props) {
    super(props)

    // create a react reference to an actual DOM (video) element that gets created inside the DOM tree
    this.videoRef = React.createRef()
  }

  // call fetchStream with id of stream we want to fetch. destructure id from match object
  componentDidMount() {
    // destructuring out id property
    const { id } = this.props.match.params
    // console.log(this.videoRef)
    // fetch the stream data
    this.props.fetchStream(id)
    this.buildPlayer()
  }

  // component fetches stream successfully and re-renders componentDidUpdate gets called
  componentDidUpdate() {
    this.buildPlayer()
  }

  componentWillUnmount() {
    this.player.destroy()
    console.log("unmount")
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return
    }

    const { id } = this.props.match.params

    // create and assign flv player and pass in a options object
    this.player = flv.createPlayer({
      // specify type of video we are trying to receive
      type: "flv",
      // url of streaming video with the id of the stream we are trying to play
      url: `http://localhost:8000/live/${id}.flv`
    })
    // call attach media element to flv player and pass in a reference to the actual video element that is being rendered inside component
    this.player.attachMediaElement(this.videoRef.current)
    // load player
    this.player.load()
  }

  render() {
    // if the data has not been returned yet
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    // destructure title and description
    const { title, description } = this.props.stream
    return (
      <div>
        {/* video element with reference to actual video element and gets passed off to the video jsx tag*/}
        {/* give video a width and controls (controls=true) props  */}
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}
// map state and ownProps to props
const mapStateToProps = (state, ownProps) => {
  // return object with a stream property and  value of the id from ownProps on the streams piece of state
  return { stream: state.streams[ownProps.match.params.id] }
}

// connect msp and fetchStream action creator
export default connect(mapStateToProps, { fetchStream })(StreamShow)

// class component look at url, get id, fetch that stream, get stream out of store, then show in render
