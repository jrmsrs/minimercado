import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import DivContainer from './components/layout/DivContainer'

import Home from './components/pages/Home'
import About from './components/pages/About'

import ListObjects from './components/pages/catalog/ListObjects'
import AddObject from './components/pages/catalog/AddObject'
import UpdateObject from './components/pages/catalog/UpdateObject'

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
            path="/list/:table"
            element={<ListObjects />}
          />
          <Route 
            path="/add/:table"
            element={<AddObject />}
          />
          <Route
            path="/update/:table/:id"
            element={<UpdateObject />}
          />
        </Routes>
      </DivContainer>
      <Footer />
    </Router>
  );

}

export default App;