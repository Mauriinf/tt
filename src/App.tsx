import React from 'react';
import logo from './logo.svg';
import './App.css';
import Listar from "./componentes/Listar";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import {Container} from '@mui/material';
function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
              <Route path='/' element={<Listar></Listar>}> </Route>
        </Routes>
      </Container>
        
    </BrowserRouter>
  );
}

export default App;
