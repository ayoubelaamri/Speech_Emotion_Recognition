import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'popper.js';
// import $ from 'jquery'; 

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './assets/css/App.css';

import Landing from './components/Landing'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="page">
          <Routes>

            <Route path="/" element={<Landing />}/>
            <Route path='*' element={<NotFound />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
