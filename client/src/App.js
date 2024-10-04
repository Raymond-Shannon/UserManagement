import React from 'react';
import MyRoute from './routes';
import {  BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer.component';

function App() {

  return (
    <div>
      <Router>
        <MyRoute />

      </Router>

      <Footer />
    </div>
  );
}

export default App;