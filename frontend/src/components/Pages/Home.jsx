import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import aboutImg from '../../assets/images/about-img.png';

const Home = ({ isLogged }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
                  {isLogged ? (
                    <Link to="/dashboard" className="btn-style">
                      Go to your dashboard
                    </Link>
                  ) : (
                    <Link to="/sign-up" className="btn-style">
                      Sign-up for free
                    </Link>
                  )}
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
                <p>
                  With Posteet, you can easily register an account and dive into
                  a world of efficient note-taking. Whether it's jotting down
                  quick reminders, brainstorming ideas, or organizing your
                  tasks, Posteet empowers you to create, edit, and prioritize
                  your notes with utmost convenience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="management section odd-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-content">
                <h2>Manage your notes</h2>
                <p>
                  Stay on top of your to-do list by assigning importance levels
                  to your notes, ensuring that your most critical tasks are
                  never overlooked. Need a little nudge to keep things on track?
                  Posteet has you covered with customizable reminders, allowing
                  you to set timely alerts for important deadlines or
                  appointments.
                </p>
              </div>
              <div className="col-lg-6 img-container">
                <Slider {...sliderSettings}>
                  <div className="slide">
                    <img src={aboutImg} alt="slide-img" />
                  </div>
                  <div className="slide">
                    <img src={aboutImg} alt="slide-img" />
                  </div>
                  <div className="slide">
                    <img src={aboutImg} alt="slide-img" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        <section className="contact section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-content">
                <h2>Contact</h2>
                <p className="subtitle">
                  You have questions, suggestions, or need further assistance ?
                </p>
                <p>
                  Feel free to reach out to us for any additional information or
                  inquiries. Simply fill out the form below. We value your
                  feedback and strive to provide the best possible experience
                  for our users.
                </p>
                <form>
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" name="email" />
                  <label htmlFor="message">Message*</label>
                  <textarea
                    name="message"
                    id="message"
                    cols="18"
                    rows="6"
                  ></textarea>
                  <div className="btn-container ">
                    <button className="btn" type="submit">
                      Send
                    </button>
                  </div>
                  <p>*Required fields</p>
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
