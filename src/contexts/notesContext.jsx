import { createContext, useEffect, useState } from 'react'

const NotesContext = createContext({})

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'Note 1',
            name: 'Jonatan',
            src: 'https://github.com/Jonatank28.png',
            alt: 'Foto perfil Github',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            tag: 'pessoal',
            date: '11/01/2020',
        },
        {
            id: 2,
            title: 'Note 2',
            name: 'Jonatan',
            src: 'https://github.com/Jonatank28.png',
            alt: 'Foto perfil Github',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            tag: 'trabalho',
            date: '11/01/2020',
        },
        {
            id: 3,
            title: 'Note 3',
            name: 'Jonatan',
            src: 'https://github.com/Jonatank28.png',
            alt: 'Foto perfil Github',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            tag: 'social',
            date: '11/01/2020',
        },
        {
            id: 4,
            title: 'Note 4',
            name: 'Jonatan',
            src: 'https://github.com/Jonatank28.png',
            alt: 'Foto perfil Github',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            tag: '',
            date: '11/01/2020',
        },
        {
            id: 5,
            title: 'Note 5',
            name: 'Jonatan',
            src: 'https://github.com/Jonatank28.png',
            alt: 'Foto perfil Github',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            tag: 'important',
            date: '11/01/2020',
        },
    ])

    // useEffect(() => {
    //     fetch('http://localhost:3000/notes')
    //         .then(res => res.json())
    //         .then(data => setNotes(data))
    // }, [])

    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    )
}

export { NotesContext, NotesProvider }
