import React, { useEffect, useState } from 'react';

const Account = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
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

  return (
    <div className="account-page">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="account-content form-container">
                <h2>Mon Compte</h2>
                <p>Nom d'utilisateur : {userName} </p>
                <p>E-mail : {userEmail}</p>
                <p>Changer de mot de passe</p>
                <p>Supprimer le compte</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
