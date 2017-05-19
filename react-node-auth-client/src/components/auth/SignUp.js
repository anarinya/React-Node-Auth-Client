import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions';

const FIELDS = {
  email: {
    label: 'Email',
    type: 'input'
  },
  password: {
    label: 'Password',
    type: 'password'
  },
  passwordConfirmation: {
    label: 'Password Confirmation',
    type: 'password'
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.signUpUser(values, () => {
      this.props.history.push('/feature');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      );
    }
  }

  renderField(field) {
    const { input, label, type, meta: { error, touched } } = field;
    const errorField = touched && error ? 'error-field' : '';
    return (
      <div>
        <label>{label}</label>
        <input {...input} className={`form-control ${errorField}`} type={type} />
        { touched && error && <div className="error">{error}</div> }
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="SignUp">
        <div className="container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset className="form-group">
             { Object.keys(FIELDS).map((field, index) => (
               <Field 
                key={index}
                name={field}
                type={FIELDS[field].type}
                label={FIELDS[field].label}
                component={this.renderField}
               />
             ))}
            </fieldset>
            { this.renderAlert() }
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  Object.keys(formProps).forEach((field) => {
    const isVowel = ['a','e','i','o','u'].indexOf(field[0]) !== -1;

    if (!formProps[field] || !formProps[field].trim()) {
      errors[field] = `Please enter a${isVowel ? 'n' : ''} ${FIELDS[field].label}`;
    }
  });

  if (formProps.email && (formProps.email.length < 8 || formProps.email.indexOf('@') === -1)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (formProps.password !== formProps.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return errors;
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signUpForm',
  validate,
  fields: Object.keys(FIELDS)
})(connect(mapStateToProps, { signUpUser })(SignUp));