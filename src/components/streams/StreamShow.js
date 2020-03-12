import React from "react"
import flv from "flv.js"
import { connect } from "react-redux"
import { fetchStream } from "../../actions/index"

class StreamShow extends React.Component {
  constructor(props) {
    super(props)

    this.videoRef = React.createRef()
  }

  componentDidMount() {
    // destructuring out id property
    const { id } = this.props.match.params
    // console.log(this.videoRef)

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

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)

// class component look at url, get id, fetch that stream, get stream out of store, then show in render
