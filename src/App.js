import NavBar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin'
import Footer from './components/Footer'
import { DataProvider } from './DataProvider/DataProvider';
import Evenement from './pages/Evenement';
import { Routes, Route } from "react-router-dom";
import './assets/css/App.css';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';

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
            <Route path='/evenement' element={<Evenement />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/login' element={<Connexion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;
