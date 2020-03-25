import React from "react"
import ReactDOM from "react-dom"

// created modal div in index.html underneath root element
const Modal = props => {
  // Return a portal from react dom
  // createPortal() function takes two arguments. The JSX we want to render and a reference to the element that we want to render this portal into (document.querySelector("#modal"))
  return ReactDOM.createPortal(
    // onDismiss prop comes from react
    // semantic-ui class names
    // event handler with callback from parent component
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        // stop bubbling up of event handler
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        {/* props passed down from parent component that renders the modal */}
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    // reference to the element in the index.html file that we want to render this portal into
    document.querySelector("#modal")
  )
}

export default Modal
