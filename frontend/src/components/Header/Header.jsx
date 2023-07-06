import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo">
              <img src={Logo} alt="Posteet" />
            </div>
            <nav className="dk-nav">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/sign-up">Sign-up</NavLink>
                  {'/'}
                  <NavLink to="/log-in">Log-in</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
