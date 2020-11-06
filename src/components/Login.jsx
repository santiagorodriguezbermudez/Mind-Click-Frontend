import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { loginApiCall } from '../actions/api';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';

const Login = ({ application, loginApiCall }) => {
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

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value="Login" />
      <span>
        <Link to="/signup">Create an Account</Link>
      </span>
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

Login.propTypes = {
  application: PropTypes.string.isRequired,
  loginApiCall: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticationToken: state.authentication.token,
  application: state.application,
});

const mapDispatchToProps = dispatch => ({
  loginApiCall: user => dispatch(loginApiCall(user)),
});

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connectedLogin;
