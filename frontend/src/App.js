import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Pages/Home';
import SignupForm from './components/Forms/signupForm';
import LoginForm from './components/Forms/loginForm';
import './styles/_scss/styles.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-up" element={<SignupForm />}></Route>
        <Route path="/log-in" element={<LoginForm />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
