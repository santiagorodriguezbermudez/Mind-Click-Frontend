import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mcLogo from '../assets/images/mindclick-logo.png';
import { loggedOutUser } from '../actions/authentication';

const Nav = ({ userLogged, loggedOutUser }) => {
  const handleLogout = () => {
    loggedOutUser();
  };

  const renderLogin = () => (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );

  const renderLogout = () => (
    <div>
      <button
        onClick={() => handleLogout()}
        type="button"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav>
      <img src={mcLogo} alt="logo" />
      {userLogged ? renderLogout() : renderLogin() }
    </nav>
  );
};

Nav.propTypes = {
  userLogged: PropTypes.bool.isRequired,
  loggedOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    userLogged: state.authentication.loggedIn,
  }
);

const mapDispatchToProps = dispatch => ({
  loggedOutUser: () => dispatch(loggedOutUser()),
});

const connectedNav = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default connectedNav;
