import { Link } from 'react-router-dom'
import './Header.css'

function Header() {

    function handleCollapse() {
      document.getElementById("navbarCollapse").classList.remove("show")
      document.getElementById("navbarBtn").classList.add("collapsed")
    }
    
    return (
        <div className="mb-5">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <i className="fa-solid fa-store text-light" aria-hidden="true"></i>
              minimercado
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" 
            aria-expanded="false" aria-label="Toggle navigation" id="navbarBtn">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleCollapse}>Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalogo" onClick={handleCollapse}>Catalogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sobre" onClick={handleCollapse}>Sobre</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="/x" onClick={handleCollapse}>Área <span className="d-sm-inline d-md-none d-lg-inline">restrita</span> </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add" onClick={handleCollapse}>add</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </div>
    );
  }
  
  export default Header;