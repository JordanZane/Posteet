import React, { useEffect, useState } from 'react';

const Account = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');
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
  }, []);

  const handleShowResetPwForm = () => {
    document.getElementById('reset-pw-form').classList.toggle('active');
    document.getElementById('account-content').classList.toggle('active');
  };

  const handleCloseResetPwForm = (e) => {
    e.preventDefault();
    document.getElementById('reset-pw-form').classList.toggle('active');
    document.getElementById('account-content').classList.toggle('active');
  };

  const resetPassword = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const data = {
      password: password,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    if (newPassword !== confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (!password || !newPassword || !confirmNewPassword) {
      alert('Tout les champs doivent être remplis');
      return;
    }

    fetch(`http://localhost:4200/users/reset-pw/${userId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('Mot de passe modifié avec succès');
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

  const ShowDeleteAccountForm = (e) => {
    e.preventDefault();
    document.getElementById('account-content').classList.toggle('active');
    document.getElementById('delete-account-form').classList.toggle('active');
  };

  const cancelDeleteAccountForm = (e) => {
    e.preventDefault();
    document.getElementById('account-content').classList.toggle('active');
    document.getElementById('delete-account-form').classList.toggle('active');
  };

  const deleteAccount = (e) => {
    e.preventDefault();
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
                  <div className="btn-container">
                    <button onClick={handleShowResetPwForm}>
                      Changer de mot de passe
                    </button>
                    <button onClick={ShowDeleteAccountForm}>
                      Supprimer le compte
                    </button>
                  </div>
                </div>
                <form
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
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <div className="btn-container">
                    <button type="submit">Confirmer</button>
                    <button onClick={handleCloseResetPwForm}>Annuler</button>
                  </div>
                </form>
                <form
                  action=""
                  className="form-container"
                  id="delete-account-form"
                  onSubmit={deleteAccount}
                >
                  <h2>Supprimer le compte</h2>
                  <label htmlFor="password">Mot de passe : </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={setPassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="btn-container">
                    <button type="submit">Confirmer</button>
                    <button onClick={cancelDeleteAccountForm}>Annuler</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Account;
