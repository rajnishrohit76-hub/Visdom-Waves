import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Navbar from './services/home/Navbar';
import HomePage from './services/home/HomePage';
import Patents from './Services/Patents';
import Parents from './Services/Parents';
import Students from './Services/Students';
import Contact from './Services/Contact';
import Dashboard from './dashboardLanding/Pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
       <Navbar />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/parent" element={<Parents />} />
        <Route path="/patent" element={<Patents />} />
        <Route path="/student" element={<Students />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
