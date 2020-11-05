import React from 'react';
import { Link } from 'react-router-dom';
import mcLogo from '../assets/images/mindclick-logo.png';

const Nav = () => (
  <nav>
    <img src={mcLogo} alt="logo" />
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </nav>
);

export default Nav;
