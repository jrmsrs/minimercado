import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ListObjects from './components/pages/catalog/ListObjects'
import AddObject from './components/pages/catalog/AddObject'
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
            path="/list/:obj"
            element={<ListObjects />}
          />
          <Route 
            path="/add/:obj"
            element={<AddObject />}
          />
        </Routes>
      </DivContainer>
      <Footer />
    </Router>
  );
}

export default App;
