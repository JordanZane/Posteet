import React from 'react';

const ResetPasswordForm = () => {
  return (
    <div className="signup-page">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-container">
                <h2>Reset password</h2>
                <form>
                  <label htmlFor="password">New password*</label>
                  <input type="password" name="password" id="password" />
                  <label htmlFor="confirmPassword">Confirm new password*</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  <div className="btn-container">
                    <input className="btn" type="submit" value="Confirm" />
                  </div>
                </form>
                <p className="required">*Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
