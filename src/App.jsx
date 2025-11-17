import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/NoteState';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import About from './Components/About';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          {/* <Home />
          <About /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>

        </Router>
      </NoteState>
    </>
  )
}
export default App
