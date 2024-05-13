import NavBar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import './assets/css/App.css';

function App() {
  return (
    <div className="App">
      <div className="flex justify-content-center align-items-center">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
