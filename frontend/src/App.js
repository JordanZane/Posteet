import { Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';

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
