import { Link } from 'react-router-dom'

function Header() {
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
            aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalogo">Catalogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sobre">Sobre</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="/x">Área <span className="d-sm-inline d-md-none d-lg-inline">restrita</span> </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">add</Link>
                </li>
              </ul>
            </div>
            {/* <Link to="/">
              <img src={logo} alt="Costs" />
            </Link>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.item}>
                <Link to="/projects">Projetos</Link>
              </li>
              <li className={styles.item}>
                <Link to="/company">Empresa</Link>
              </li>
              <li className={styles.item}>
                <Link to="/contact">Contato</Link>
              </li>
            </ul> */}
          </div>
        </nav>
        </div>
    );
  }
  
  export default Header;