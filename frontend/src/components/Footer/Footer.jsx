import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="content">
              © 2023 Posteet Tout droits réservés -{' '}
              <Link to={'/legal'}>Mentions légales</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
