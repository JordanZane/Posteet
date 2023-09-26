import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import LoadingScreen from '../LoadingScreen/LoadingScreen';

import aboutImg from '../../assets/images/about-img.svg';
import submitImg from '../../assets/images/submit-img.svg';

const Home = ({ isLogged }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const URLDev = process.env.REACT_APP_URLDev;
  const URLProd = process.env.REACT_APP_URLProd;
  const userId = localStorage.getItem('userId');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('Message du formulaire envoyé');

    const email = userEmail;
    const message = userMessage;
    const data = {
      email: email,
      message: message,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    setSubmitting(true);
    fetch(`${URLDev}/send-email`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Email send');
          alert('Email send');
          setUserEmail('');
          setUserMessage('');
        } else {
          console.log('Error when sending email');
          alert('Error when sending email');
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log('Error when sending email :', error);
        alert('Error when sending email');
        setSubmitting(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="home-page">
      {loading ? <LoadingScreen /> : null}
      <main>
        <section className="about section odd-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-content">
                <h2>A propos</h2>
                <p>
                  Bienvenue sur <span>Posteet</span>, votre application web de
                  création de notes qui offre une plateforme conviviale pour
                  gérer et organiser vos post-it numériques.
                </p>
                <p>
                  Avec Posteet, vous pouvez facilement créer un compte et
                  plonger dans un monde de prise de notes efficace
                </p>
                <div className="btn-container">
                  {isLogged ? (
                    <Link to={`/dashboard/${userId}`} className="btn-style">
                      <span>Tableau de bord</span>
                    </Link>
                  ) : (
                    <Link to="/sign-up" className="btn-style">
                      <span>Inscription gratuite</span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="col-lg-6 img-container">
                <img src={submitImg} alt="Posteet - about" />
              </div>
            </div>
          </div>
        </section>

        <section className="productivity section even-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 img-container">
                <img src={aboutImg} alt="Posteet - about" />
              </div>
              <div className="col-lg-6 text-content">
                <h2>Boostez votre productivité</h2>
                <p>
                  Que ce soit pour générer des idées ou organiser vos tâches,
                  Posteet vous permet de créer, modifier et prioriser vos notes
                  avec la plus grande commodité.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-content">
                <h2>Contactez-nous</h2>
                <p className="subtitle">
                  Vous avez des questions, des suggestions ou besoin d'une
                  assistance supplémentaire ?
                </p>
                <p>
                  N'hésitez pas à nous contacter pour toute information
                  complémentaire ou demande. Il vous suffit de remplir le
                  formulaire ci-dessous. Vos retours sont précieux pour nous, et
                  nous nous efforçons de fournir la meilleure expérience
                  possible à nos utilisateurs.
                </p>
                <form onSubmit={handleSubmitForm}>
                  <label htmlFor="email">E-mail*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="message">Message*</label>
                  <textarea
                    name="message"
                    id="message"
                    cols="18"
                    rows="6"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    required
                  ></textarea>
                  <div className="btn-container ">
                    <button className="btn" type="submit">
                      {submitting ? 'Envoi en cours' : 'Envoyer'}
                    </button>
                  </div>
                  <p>*Champs requis</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
