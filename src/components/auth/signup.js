import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// import { } from '../../actions';

class Signup extends Component {
  renderField(field){
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
        className="form-control"
        type={field.type}
        {...field.input}
        />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form>
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
        <button action="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup'
})(connect(null)(Signup));
