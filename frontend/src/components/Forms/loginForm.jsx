import React from 'react';

const loginForm = () => {
  return (
    <div className="login-page">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-container" id="login-form">
                <h2>Log-in</h2>
                <form>
                  <label htmlFor="username">Username*</label>
                  <input type="text" name="username" id="username" />
                  <label htmlFor="password">Password*</label>
                  <input type="password" name="password" id="password" />
                  <div className="btn-container">
                    <input className="btn" type="submit" value="Log-in" />
                  </div>
                </form>
                <p>
                  Forget Your password ? <a href="mailto:">Reset password</a>
                </p>
                <p className="required">*Required</p>
              </div>
              <div className="form-container" id="reset-pw-form-container">
                <h2>Reset password</h2>
                <form>
                  <label htmlFor="email">Email*</label>
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

export default loginForm;
