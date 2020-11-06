import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { signupApiCall } from '../actions/api';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';

const Signup = ({ application, signupApiCall }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      name,
      email,
      password,
      passwordConfirmation,
    };
    signupApiCall(user);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <label htmlFor={name}>
        Full name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Type in your full name"
        />
      </label>
      <label htmlFor={email}>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Type in your email address"
        />
      </label>
      <label htmlFor={password}>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Create your password"
        />
      </label>
      <label htmlFor={passwordConfirmation}>
        Confirm Password
        <input
          type="password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          required
          placeholder="Please confirm your password"
        />
      </label>
      <input type="submit" value="Signup" />
    </form>
  );

  if (validateCurrentToken()) {
    return (
      <Redirect to="/therapists" />
    );
  }

  return (
    <div>
      {application === 'LOADING' ? <Loading /> : renderForm()}
    </div>
  );
};

Signup.propTypes = {
  application: PropTypes.string.isRequired,
  signupApiCall: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticationToken: state.authentication.token,
  application: state.application,
});

const mapDispatchToProps = dispatch => ({
  signupApiCall: user => dispatch(signupApiCall(user)),
});

const connectSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default connectSignup;
