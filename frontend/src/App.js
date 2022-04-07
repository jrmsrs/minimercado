import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ListProducts from './components/pages/catalog/ListProducts'

function App() {
  return (
    <Router>
      <Header />
      <div className="container text-light">
        <Routes>
          <Route 
            exact path="/"
            element={<Home />}
          />
          <Route 
            path="/sobre"
            element={<About />}
          />
          <Route 
            path="/catalogo"
            element={<ListProducts />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
