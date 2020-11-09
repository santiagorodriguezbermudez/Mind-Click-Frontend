import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { loginApiCall } from '../actions/api';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';
import '../assets/styles/login.css';

const Login = ({ application, loginApiCall, authenticationMessage }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    loginApiCall(user);
  };

  const renderError = () => (
    `Error: ${authenticationMessage}. Please try again.`
  );

  const renderForm = () => (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <h1>Log In</h1>
        <label htmlFor={email}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Type in your email address"
            className="form-input"
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
            className="form-input"
          />
        </label>
        <input type="submit" value="Login" className="submit-form" />
        <span>
          <Link to="/signup">Create an Account</Link>
        </span>
        {authenticationMessage !== '' ? <p className="errorAuth">{renderError()}</p> : null}
      </form>
    </div>
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

Login.propTypes = {
  application: PropTypes.string.isRequired,
  loginApiCall: PropTypes.func.isRequired,
  authenticationMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  authenticationToken: state.authentication.token,
  authenticationMessage: state.authentication.message,
  application: state.application,
});

const mapDispatchToProps = dispatch => ({
  loginApiCall: user => dispatch(loginApiCall(user)),
});

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connectedLogin;
