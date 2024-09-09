// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext'; // Alterar para FormProvider
import Pagina1 from './components/Pagina1';
import Pagina2 from './components/Pagina2';
import Pagina3 from './components/Pagina3';

function App() {
  return (
    <Router>
      <FormProvider> {/* Use FormProvider aqui */}
        <Routes>
          <Route path="/" element={<Pagina1 />} />
          <Route path="/pagina2" element={<Pagina2 />} />
          <Route path="/pagina3" element={<Pagina3 />} />
        </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;
