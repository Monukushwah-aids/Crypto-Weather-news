import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherApp from './pages/weather'
import CryptoDashboard from './components/CryptoDashboard'
import CryptoNews from './components/CryptoNews'
import HomePage from './pages/Home'
function App() {
  
  return (
   <Router>
    <Routes>
    <Route path='/' element={< HomePage />} />,
    <Route path='/crypto' element={< CryptoDashboard />} />,
    <Route path='/cryptonews' element={< CryptoNews />} />,
    <Route path='/weather' element={< WeatherApp />} />,


   </Routes>
   </Router>


  //<WeatherApp/>
    //<CryptoDashboard/>
    //<CryptoNews/>
    //<HomePage/>
  )
}

export default App
