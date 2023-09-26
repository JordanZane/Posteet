import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { userId } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const URLDev = process.env.REACT_APP_URL;

  const resetPassword = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const data = {
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    if (newPassword !== confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      alert('Tout les champs doivent être remplis');
      return;
    }

    fetch(`${URLDev}/users/reset-pw-email/${userId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('Mot de passe modifié avec succès');
          navigate(`/log-in`);
        } else {
          alert(
            'Problème lors de la modification du mot de passe. Vérifiez vos saisies'
          );
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la modification du mot de passe : ', error);
        alert(
          'Problème lors de la modification du mot de passe. Vérifiez vos saisies'
        );
      });
  };
  return (
    <div className="signup-page">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-container">
                <h2>Rénitialiser mot de passe</h2>
                <form onSubmit={resetPassword}>
                  <label htmlFor="newPassword">Nouveau mot de passe*</label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="confirmPassword">
                    Confirmer nouveau mot de passe*
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <div className="btn-container">
                    <input className="btn" type="submit" value="Confirmer" />
                  </div>
                </form>
                <p className="required">*Requis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
