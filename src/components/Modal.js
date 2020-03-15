import React from "react"
import ReactDOM from "react-dom"

// created modal div in index.html underneath root element
const Modal = props => {
  // use of react portals
  return ReactDOM.createPortal(
    // onDismiss prop comes from react
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        // prevents bubbling up of event handler
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  )
}

export default Modal
