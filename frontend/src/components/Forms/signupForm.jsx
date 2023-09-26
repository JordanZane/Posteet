import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const URLDev = process.env.REACT_APP_URL;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe de correspondent pas');
      return;
    }
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert('Veuillez remplir tout les champs');
      return;
    }
    fetch(`${URLDev}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        document
          .getElementById('signup-form-container')
          .classList.toggle('hide');
        document
          .getElementById('create-account-succes-popup')
          .classList.toggle('hide');
      })

      .catch((error) => {
        console.log('Error :', error);
      });
  };

  return (
    <div className="signup-page">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-container" id="signup-form-container">
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">Nom utilisateur*</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handlechange}
                  />
                  <label htmlFor="email">E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handlechange}
                  />
                  <label htmlFor="password">Mot de passe*</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handlechange}
                  />
                  <label htmlFor="confirmPassword">
                    Confirmer mot de passe*
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handlechange}
                  />
                  <div className="btn-container">
                    <input className="btn" type="submit" value="Sign-up" />
                  </div>
                </form>
                <p>
                  Déja un compte ? <NavLink to="/log-in">Connexion</NavLink>
                </p>
                <p className="required">*Requis</p>
              </div>
              <div
                className="form-container hide"
                id="create-account-succes-popup"
              >
                <h2>Compte créer avec succès !</h2>
                <p>
                  <NavLink to="/log-in">Connecter vous</NavLink> /{' '}
                  <NavLink to="/">Page d'accueil</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
