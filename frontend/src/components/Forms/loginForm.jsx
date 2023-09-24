import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginForm = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    username: '',
    password: '',
  });
  const [userEmail, setUserEmail] = useState('');

  const [showResetPwForm, setShowResetPwForm] = useState(false);

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

  const handleResetPwForm = (e) => {
    e.preventDefault();
    if (showResetPwForm) {
      setShowResetPwForm(false);
    } else {
      setShowResetPwForm(true);
    }
  };

  const handleSubmitResetPw = (e) => {
    e.preventDefault();
    const email = userEmail;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (!userEmail) {
      alert('Renseignez votre e-mail');
      return;
    }

    fetch(`http://localhost:4200/reset-pw-email`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(email),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Email send');
          alert('Email send');
          setUserEmail('');
        } else {
          console.log('Error when sending email');
          alert('Error when sending email');
        }
      })
      .catch((error) => {
        console.log('Error when sending email :', error);
        alert('Error when sending email');
      });
  };

  return (
    <div className="login-page">
      {showResetPwForm ? (
        <section className="section ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-container">
                  <h2>Rénitialiser votre mot de passe</h2>
                  <p>
                    Nous vous enverrons un mail contenant un lien permettant de
                    rénitialiser votre mot de passe
                  </p>
                  <form onSubmit={handleSubmitResetPw}>
                    <label htmlFor="resetPwEmail">E-mail*</label>
                    <input
                      type="text"
                      name="resetPwEmail"
                      id="resetPwEmail"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <div className="btn-container">
                      <button className="btn btn-green" type="submit">
                        Confirmer
                      </button>
                      <button
                        className="btn btn-red"
                        onClick={handleResetPwForm}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="section">
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
                    Mot de passe oublié ?{' '}
                    <span onClick={handleResetPwForm}>
                      Rénitialiser mot de passe
                    </span>
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
        </section>
      )}
    </div>
  );
};

export default LoginForm;
