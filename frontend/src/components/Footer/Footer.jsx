import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="content">
              © 2023 Posteet All rights reserved -{' '}
              <Link to={'/legal'}>Legal</Link> -{' '}
              <Link to={'/cookies'}>Cookies</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
