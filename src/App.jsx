import logo from './logo.svg';
import './App.css';
import MainHome from './components/MainHome';
import About from './components/About'
import Contact from './components/Contact'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Order from './components/Order'
import Register from './components/Register'
import Login from './components/Login';
import {useState,useEffect} from 'react';
import {app,auth} from './firebase';
import OrderviewbyAdmin from './components/OrderviewbyAdmin'
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">

        <Navbar user={user} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/About" element={<About />} />
            <Route path="/Menu" element={<Menu user={user} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Order user={user} />} />
            <Route path="/orderslist" element={<OrderviewbyAdmin />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}


export default App;