import NavBar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin'
import { Routes, Route } from "react-router-dom";
import './assets/css/App.css';

function App() {
  return (
    <div className="App">
      <div className="flex justify-content-center align-items-center">
        <NavBar />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
