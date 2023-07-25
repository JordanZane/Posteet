import { Routes, Route } from 'react-router-dom';
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
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userIsLogged = localStorage.getItem('isLogged');
    if (userIsLogged === 'true') {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <Header isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-up" element={<SignupForm />}></Route>
        <Route
          path="/log-in"
          element={<LoginForm setIsLogged={setIsLogged} />}
        ></Route>
        <Route path="/reset-password" element={<ResetPasswordForm />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
