import { Link } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  return (
    <header className="header-jc">
      <div className="logo">MC</div>
      <nav className="nav-jc">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/a-propos" className="nav-btn">About</Link>
        <Link to="/services" className="nav-btn">Services</Link>
        <Link to="/projets" className="nav-btn">Projects</Link>
        <Link to="/contact" className="nav-btn">Contact</Link>
      </nav>
    </header>
  );
}
