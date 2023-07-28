import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Account = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      fetch(`http://localhost:4200/users/${id}`, {
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
          setUserName(data.users.username);
          setUserEmail(data.users.email);
        })
        .catch((error) => {
          console.log(
            "Erreur lors de la récupération de l'utilisateur : ",
            error
          );
        });
    };
    getUser();
  }, [id]);

  return (
    <div className="account-page">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="account-content">
                <h1>My account</h1>
                <p>Username : {userName} </p>
                <p>Email : {userEmail}</p>
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
