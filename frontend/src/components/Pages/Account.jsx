import React, { useEffect, useState } from 'react';

const Account = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showResetPwForm, setShowResetPwform] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      fetch(`http://localhost:4200/users/${userId}`, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erreur lors de la récupération de l'utilisateur");
          }
        })
        .then((data) => {
          setUserName(data.user.username);
          setUserEmail(data.user.email);
        })
        .catch((error) => {
          console.log(
            "Erreur lors de la récupération de l'utilisateur : ",
            error
          );
        });
    };
    getUser();
  }, [userId]);

  const handleShowResetPwForm = () => {
    setShowResetPwform(true);
    document.getElementById('reset-pw-form').classList.toggle('active');
    document.getElementById('account-content').classList.toggle('active');
  };

  const handleCloseResetPwForm = () => {
    setShowResetPwform(false);
    document.getElementById('reset-pw-form').classList.toggle('active');
    document.getElementById('account-content').classList.toggle('active');
  };

  const resetPassword = () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const data = {
      newPassword: newPassword,
    };

    fetch('http://localhost:4200/reset-pw', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then((response) => {});
  };

  return (
    <>
      <div className="account-page">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="account-content form-container"
                  id="account-content"
                >
                  <h2>Mon Compte</h2>
                  <p>Nom d'utilisateur : {userName} </p>
                  <p>E-mail : {userEmail}</p>
                  <button onClick={handleShowResetPwForm}>
                    Changer de mot de passe
                  </button>
                  <button>Supprimer le compte</button>
                </div>
                <div
                  className="form-container"
                  id="reset-pw-form"
                  onSubmit={resetPassword}
                >
                  <h2>Changer de mot de passe</h2>
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="newpassword">Nouveau mot de passe :</label>
                  <input
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="confirmnewpassword">
                    Confirmer nouveau mot de passe :
                  </label>
                  <input
                    type="password"
                    name="confirmnewpassword"
                    id="confirmnewpassword"
                    value={confirmNewPassword}
                    onChange={setConfirmNewPassword}
                  />
                  <button type="submit">Confirmer</button>
                  <button onClick={handleCloseResetPwForm}>Annuler</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Account;
