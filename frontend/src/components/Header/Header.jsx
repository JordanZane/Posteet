import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

const Header = ({ isLogged }) => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-content">
              <div className="logo">
                <Link to="/">
                  <img src={Logo} alt="Posteet" />
                </Link>
              </div>
              <nav className="dk-nav">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  {isLogged ? (
                    <>
                      <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                      </li>
                      <li>
                        <button>
                          <i className="fa-solid fa-user"></i>
                        </button>
                        <ul className="subnav">
                          <li>My account</li>
                          <li>Dark Mode</li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <li>
                      <NavLink to="/sign-up">Sign-up</NavLink>
                      {' / '}
                      <NavLink to="/log-in">Log-in</NavLink>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
