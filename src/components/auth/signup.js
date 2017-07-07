import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions';

class Signup extends Component {
  renderField(field){
    const { meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
        className="form-control"
        type={field.type}
        {...field.input}
        />
        <div className="text-help">
          {touched && error ? error : ''}
        </div>
      </div>
    );
  }

  handleFormSubmit(formProps) {
    // call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
        label="Email:"
        name="email"
        type="text"
        component={this.renderField}
        />
        <Field
        label="Password:"
        name="password"
        type="password"
        component={this.renderField}
        />
        <Field
        label="Confirm Password:"
        name="passwordConfirm"
        type="password"
        component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = "Please enter a password";
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps,{ signupUser })(Signup));
