import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../../assets/images/about-img.png';

const Home = () => {
  return (
    <div className="home-page">
      <main>
        <section className="about section odd-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-content">
                <h2>About</h2>
                <p>
                  Welcome to <span>Posteet</span>, your web application for note
                  creation which offers a user-friendly platform to manage and
                  organize your digital post-it notes.
                </p>
                <div className="btn-container">
                  <Link to="/sign-up" className="btn-style">
                    Sign-up for free
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 img-container">
                <img src={aboutImg} alt="Posteet - about" />
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
              <h2>Boost your productivity</h2>
              <p>With Posteet, you can easily register an account and dive into a world of efficient note-taking. Whether it's jotting down quick reminders, brainstorming ideas, or organizing your tasks, 
              Posteet empowers you to create, edit, and prioritize your notes with utmost convenience.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
