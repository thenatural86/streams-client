import React from "react"
// redux form imports. Field is a react component, reduxForm is a function that has same functionality as connect that allows us to call an action creator and get form data into our component.
import { Field, reduxForm } from "redux-form"

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  // render input helper method
  // input and meta de-structured out of formProps object from redux form
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`
    return (
      <div className={className}>
        <label>{label}</label>
        {/* input properties from formProps added onto input element  */}
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    console.log("submit")
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/* field component imported from redux-form */}
        {/* needs a name and component prop. component can be a react component or a function for the Field to call */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.title) {
    errors.title = "You must enter a title"
  }
  if (!formValues.description) {
    errors.description = "You must enter a description"
  }
  return errors
}

// reduxForm receives an object
export default reduxForm({
  // name for form ("streamCreate") has it's values stored inside the form reducer
  form: "streamForm",
  validate
})(StreamForm)
