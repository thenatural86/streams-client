import React from "react"
// redux form imports. Field is a react component, reduxForm is a function that has same functionality as connect that allows us to call an action creator and get form data into our component.
import { Field, reduxForm } from "redux-form"

class StreamForm extends React.Component {
  // error handling helper method
  // error and touched de-structured out of meta object
  renderError = ({ error, touched }) => {
    // if user has touched the form and there is a error message
    if (touched && error) {
      // return error message
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  // render input helper method
  // input and meta de-structured out of formProps object from redux form
  // meta property has a meta.error property on it
  renderInput = ({ input, label, meta }) => {
    // if meta.error and meta.touched are true, className = field error, otherwise className = field
    const className = `field ${meta.error && meta.touched ? "error" : ""}`
    return (
      <div className={className}>
        <label>{label}</label>
        {/* input properties from formProps added onto input element  */}
        <input {...input} autoComplete="off" />
        {/* renderError helper method with meta property passed in. now renderError has access to meta object */}
        {this.renderError(meta)}
      </div>
    )
  }

  // callback function for when form is submitted
  // don't need to call e.preventDefault() b/c redux form takes care of it
  // argument of formValues passed in
  onSubmit = formValues => {
    console.log("submit")
    // onSubmit callback from parent component
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form
        className="ui form error"
        // handleSubmit is a callback function provided by redux form, pass in onSubmit callback function from streamCreate as argument
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

// gets called with formValues object which contains all the values form the form
const validate = formValues => {
  // initialize empty errors object
  const errors = {}
  // if a user doesn't enter in a title
  if (!formValues.title) {
    // return object with key/value pair with the name of the field and error message
    errors.title = "You must enter a title"
  }
  // if a user doesn't enter in a description
  if (!formValues.description) {
    // return object with key/value pair with the name of the field and error message
    errors.description = "You must enter a description"
  }
  // otherwise return empty errors object
  return errors
}

// reduxForm receives an object
export default reduxForm({
  // name for form ("streamCreate") has it's values stored inside the form reducer
  form: "streamForm",
  // ES6 - validate function (validate: validate)
  validate
})(StreamForm)
