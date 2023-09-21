import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import {
  ConfirmationModal,
  LogoutButton,
} from '../StyledComponents/LogoutConfirm';
import Logo from '../../assets/images/logo.svg';

const Header = ({ isLogged, setIsLogged }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const HandleSubNav = () => {
    document.getElementById('subnav').classList.toggle('active');
  };

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    setIsLogged(false);
    setShowConfirmation(false);
    localStorage.setItem('isLogged', false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleCancelLougout = () => {
    setShowConfirmation(false);
  };

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
                        <NavLink to={`/dashboard/${userId}`}>Dashboard</NavLink>
                      </li>
                      <li>
                        <button onClick={HandleSubNav}>
                          <i className="fa-solid fa-user"></i>
                        </button>
                        <ul id="subnav">
                          <li>
                            <Link to={`/my-account/${userId}`}>My account</Link>
                          </li>
                          <li>Dark Mode</li>
                          <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <li className="link-container">
                      <NavLink to="/sign-up">Sign-up</NavLink>
                      {' / '}
                      <NavLink to="/log-in">Log-in</NavLink>
                    </li>
                  )}
                </ul>
              </nav>
              <nav className="sm-nav">
                <ul>
                  <li>
                    <NavLink to="/">
                      <i class="fa-solid fa-house"></i>
                    </NavLink>
                  </li>
                  {isLogged ? (
                    <>
                      <li>
                        <NavLink to={`/dashboard/${userId}`}>Dashboard</NavLink>
                      </li>
                      <li>
                        <button onClick={HandleSubNav}>
                          <i className="fa-solid fa-user"></i>
                        </button>
                        <ul id="subnav">
                          <li>
                            <Link to={`/my-account/${userId}`}>My account</Link>
                          </li>
                          <li>Dark Mode</li>
                          <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <li className="link-container">
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
        <div className="overlay-popup">
          <ConfirmationModal>
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div>
              <LogoutButton onClick={handleConfirmLogout}>Oui</LogoutButton>
              <LogoutButton onClick={handleCancelLougout}>Non</LogoutButton>
            </div>
          </ConfirmationModal>
        </div>
      )}
    </header>
  );
};

export default Header;
