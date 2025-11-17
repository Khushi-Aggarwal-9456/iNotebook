import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const s1 = {
        "name": "khushi Aggarwal",
        "course": "MCA"
    }
    const [state, setState] = useState(s1)
    const change = () => {
        setTimeout(() => {
            setState({
                "name": "Mayank Aggarwal",
                "course": "School"
            })
        }, 3000)
    }
    return (
        <NoteContext.Provider value={{state,change}}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState
