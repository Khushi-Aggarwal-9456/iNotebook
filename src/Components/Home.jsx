import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'

const Home = () => {
  const a=useContext(NoteContext)
  useEffect(()=>{
    a.change()
  },[])
  return (
    <div>
      <h1>this is home {a.state.course}</h1>
    </div>
  )
}

export default Home
