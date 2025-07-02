import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faProjectDiagram, faCog } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">My Portfolio</Link>
        <ul className="navbar-menu">
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Beranda</Link></li>
          <li><Link to="/projects"><FontAwesomeIcon icon={faProjectDiagram} /> Projek</Link></li>
          <li><Link to="/experience"><FontAwesomeIcon icon={faBriefcase} /> Pengalaman Kerja</Link></li>
          <li><Link to="/about"><FontAwesomeIcon icon={faUser} /> Tentang</Link></li>
          <li><Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> Kontak</Link></li>
          <li><Link to="/admin"><FontAwesomeIcon icon={faCog} /> Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;