import React from 'react';
import '../assets/styles/footer.css';
import mcLogo from '../assets/images/mindclick-logo.png';

const Footer = () => (
  <footer>
    <img src={mcLogo} alt="logo" />
    <span role="img" aria-label="footer">© 2020 Mind Click. Made with ❤️ from Colombia.</span>
  </footer>
);

export default Footer;
