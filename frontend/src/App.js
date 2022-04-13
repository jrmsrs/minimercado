import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ListProducts from './components/pages/catalog/ListProducts'
import CreateProductFormik from './components/pages/catalog/CreateProductFormik'
import DivContainer from './components/layout/DivContainer'

function App() {
  return (
    <Router>
      <Header />
      <DivContainer>
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
          <Route 
            path="/add"
            element={<CreateProductFormik />}
          />
        </Routes>
      </DivContainer>
      <Footer />
    </Router>
  );
}

export default App;
