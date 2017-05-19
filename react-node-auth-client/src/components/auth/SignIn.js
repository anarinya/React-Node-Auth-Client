import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../../actions';

const FIELDS = {
  email: {
    type: 'input',
    label: 'Email'
  },
  password: {
    type: 'password',
    label: 'Password'
  }
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const { email, password } = values;
    const user = { email, password };

    this.props.signInUser(user, () => {
      this.props.history.push('/feature');
    });
  }

  renderField(field) {
    const { input, label, type } = field;
    return (
      <div>
        <div>
          <label>{label}: </label>
        </div>
        <div>
          <input type={type} {...input} className="form-control" />
        </div>
      </div>
    );
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

  render() {
    // pull props provided by redux form
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form className="SignIn" onSubmit={ handleSubmit(this.onSubmit) }>
          <fieldset className="form-group">
            { Object.keys(FIELDS).map((field, index) => (
              <Field 
                key={index} 
                label={FIELDS[field].label} 
                name={field} 
                type={FIELDS[field].type}
                component={ this.renderField } 
              />
            ))}
            <br />
            { this.renderAlert() }
            <button className="btn btn-primary">Sign In</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({ 
  form: 'signInForm',
  fields: Object.keys(FIELDS)
})(connect(mapStateToProps, { signInUser })(SignIn));