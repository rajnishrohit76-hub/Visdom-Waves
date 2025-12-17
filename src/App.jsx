import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


import Patents from './Services/Patents'
import Parents from './Services/Parents'
import Students from './Services/Students'
import Contact from './Services/Contact'
import Navbar from './Services/home/navbar'
import HomePage from './Services/home/homePage'

function App() {
  return (
    <BrowserRouter>
       <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parent" element={<Parents />} />
        <Route path="/patent" element={<Patents />} />
        <Route path="/student" element={<Students />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
