import React, { useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import { useContext } from 'react'


const About = () => {
  const a = useContext(NoteContext)

  useEffect(() => {
    a.change()
  }, [])
  return (
    <div>
      <h1>this is about {a.state.name}</h1>
    </div>
  )
}

export default About
