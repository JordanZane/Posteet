import { Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
<<<<<<< HEAD
import Home from './components/Pages/Home';
=======
import './styles/_scss/styles.scss';
>>>>>>> develop

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
