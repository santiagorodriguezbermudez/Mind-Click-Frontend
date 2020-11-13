import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mcLogo from '../assets/images/mindclick-logo.png';
import { loggedOutUser } from '../actions/authentication';
import '../assets/styles/navbar.css';

const Nav = ({ userLogged, loggedOutUser }) => {
  // Create the effect of changing the navbar upon scroll
  const [navBg, setNavBg] = React.useState(false);

  const navRef = React.useRef();
  navRef.current = navBg;

  React.useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;

      if (navRef.current !== show) {
        setNavBg(!navBg);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  const handleLogout = () => {
    loggedOutUser();
    return <Redirect to="/login" />;
  };

  const renderLogin = () => (
    <div className="hero-links">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );

  const renderLogout = () => (
    <div className="hero-links">
      <button
        onClick={() => handleLogout()}
        type="button"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav
      className={navBg ? 'navbar active sticky top-0' : 'navbar no-active sticky top-0'}
      style={{ transition: '1s ease' }}
    >
      <Link to="/therapists">
        <img src={mcLogo} alt="logo" />
      </Link>
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
