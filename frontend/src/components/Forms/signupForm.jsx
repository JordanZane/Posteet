import React from 'react';
import { NavLink } from 'react-router-dom';

const signupForm = () => {
  return (
    <div className="signup-page">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-container">
                <h2>Sign-up</h2>
                <form>
                  <label htmlFor="username">Username*</label>
                  <input type="text" name="username" id="username" />
                  <label htmlFor="email">Email*</label>
                  <input type="email" name="email" id="email" />
                  <label htmlFor="password">Password*</label>
                  <input type="password" name="password" id="password" />
                  <label htmlFor="confirmPassword">Confirm password*</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
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

export default signupForm;
