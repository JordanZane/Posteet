import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Pages/Home';
import SignupForm from './components/Forms/signupForm';
import LoginForm from './components/Forms/loginForm';
import ResetPasswordForm from './components/Forms/ResetPasswordForm';
import DashBoard from './components/Pages/DashBoard';
import './styles/_scss/styles.scss';

function App() {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    setIsLogged(storedIsLogged === 'true');
  }, []);

  if (isLogged === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route
          path="/log-in"
          element={<LoginForm setIsLogged={setIsLogged} />}
        />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        {isLogged ? (
          <Route path="/dashboard" element={<DashBoard />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
