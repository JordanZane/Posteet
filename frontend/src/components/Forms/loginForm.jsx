import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginForm = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4200/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => {
        if (!response.ok) {
          alert('Paire identifiant / mot de passe incorrecte');
          throw new Error('Paire identifiant / mot de passe incorrecte');
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          username: '',
          password: '',
        });
        setIsLogged(true);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        navigate(`/dashboard/${data.userId}`);
      })
      .catch((error) => {
        console.log('Error :', error);
        setIsLogged(false);
      });
  };

  return (
    <div className="login-page">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-container" id="login-form">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">Nom utilisateur*</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Mot de passe*</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                  <div className="btn-container">
                    <input className="btn" type="submit" value="Log-in" />
                  </div>
                </form>
                <p>
                  Mot de passe oublier ?{' '}
                  <a href="mailto:">Rénitialiser mot de passe</a>
                </p>
                <p className="required">*Requis</p>
              </div>
              <div className="form-container" id="reset-pw-form-container">
                <h2>Rénitialiser mot de passe</h2>
                <form>
                  <label htmlFor="email">E-mail*</label>
                  <input type="email" name="email" id="email" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
