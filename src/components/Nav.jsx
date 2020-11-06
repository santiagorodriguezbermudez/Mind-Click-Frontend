import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mcLogo from '../assets/images/mindclick-logo.png';

const Nav = ({ userLogged }) => {
  const renderLogin = () => (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );

  const renderLogout = () => (
    <div>
      <Link to="/logout">Logout</Link>
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
};

const mapStateToProps = state => (
  {
    userLogged: state.authentication,
  }
);

const connectedNav = connect(mapStateToProps)(Nav);

export default connectedNav;
