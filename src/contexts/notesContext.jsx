import { createContext, useEffect, useState } from 'react'
import { FaRegStar } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'

const NotesContext = createContext({})

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([])

    const dataTags = [
        {
            id: 1,
            title: 'Pessoal',
        },
        {
            id: 2,
            title: 'Trabalho',
        },
        {
            id: 3,
            title: 'Social',
        },
        {
            id: 4,
            title: 'Importante',
        },
    ]

    const dataLinks = [
        {
            id: 1,
            title: 'Todas as notas',
            icon: CgNotes,
            url: 'https://www.notion.so/Notas-1b1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e',
        },
        {
            id: 2,
            title: 'Favoritas',
            icon: FaRegStar,
            url: 'https://www.notion.so/Anotacoes-1b1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e',
        },
    ]

    return (
        <NotesContext.Provider value={{ notes, setNotes, dataTags, dataLinks }}>
            {children}
        </NotesContext.Provider>
    )
}

export { NotesContext, NotesProvider }
