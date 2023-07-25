import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../../assets/images/logo.svg';

const Header = ({ isLogged, setIsLogged }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const ConfirmationModal = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  `;

  const LogoutButton = styled.button`
    background-color: red;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  `;

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
                          <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                          </li>
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
      {showConfirmation && (
        <ConfirmationModal>
          <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
          <div>
            <LogoutButton>Oui</LogoutButton>
            <LogoutButton>Non</LogoutButton>
          </div>
        </ConfirmationModal>
      )}
    </header>
  );
};

export default Header;
