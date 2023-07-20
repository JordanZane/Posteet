import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
    fetch('http://localhost:4200/signup', {
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
              <div className="form-container">
                <h2>Sign-up</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">Username*</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handlechange}
                  />
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handlechange}
                  />
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handlechange}
                  />
                  <label htmlFor="confirmPassword">Confirm password*</label>
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
                  Already have an account ?{' '}
                  <NavLink to="/log-in">Log-in</NavLink>
                </p>
                <p className="required">*Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
