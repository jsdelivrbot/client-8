import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
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

  handleFormSubmit({ email, password }) {
    console.log(email, password);
    //Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const { handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
        label="Email"
        name="email"
        type="text"
        component={this.renderField}
        />
        <Field
        label="Password"
        name="password"
        type="password"
        component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


export default reduxForm({
  form: 'SigninForm'
})(connect(mapStateToProps,{ signinUser })(Signin));
