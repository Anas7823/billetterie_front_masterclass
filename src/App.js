import NavBar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin'
import Footer from './components/Footer'
import { DataProvider } from './DataProvider/DataProvider';
import Evenement from './pages/Evenement';
import Calendrier from './pages/Calendrier';
import { Routes, Route } from "react-router-dom";
import './assets/css/App.css';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import MonCompte from './pages/MonCompte';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <div className="flex justify-content-center align-items-center">
          <NavBar />
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path='/evenement' element={<Evenement />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/login' element={<Connexion />} />
            <Route path='/mon-compte' element={<MonCompte />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;
