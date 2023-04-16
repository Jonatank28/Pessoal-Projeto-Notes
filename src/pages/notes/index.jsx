import Card from '@/components/Card'
import { useState, useRef, useContext, useEffect } from 'react'
import Modal from '@/components/dialog'
import Inputt from '@/components/Form/Inputt'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { NotesContext } from '../../contexts/notesContext'
import { v4 as uuidv4 } from 'uuid'
import SelectField from '@/components/Form/Select'

const Notes = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { notes, setNotes, dataTags, dataLinks } = useContext(NotesContext)

    const [selectedLinks, setSelectedLinks] = useState(
        dataLinks.findIndex((link) => link.id === 1)
    )

    const [selectedTags, setSelectedTags] = useState(
        dataTags.findIndex((tag) => tag.id === 1)
    )

    const [hoverLinks, setHoverLinks] = useState(-1)
    const [hoverTags, setHoverTags] = useState(-1)

    const handleLinkClick = (index) => {
        setSelectedLinks(index)
    }

    const handleTagClick = (index) => {
        setSelectedTags(index)
    }

    // Abrir modal
    const handleOpenModal = () => {
        setIsOpen(true)
    }

    // Fechar modal
    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const initialValues = {
        title: '',
        content: '',
        tag: 'sem tag',
    }

    //  Valida os campos do formulário
    const NewNoteFormSchema = Yup.object().shape({
        title: Yup.string().required('Obrigatório'),
        content: Yup.string().required('Obrigatório'),
        tag: Yup.string().required('Obrigatório'),
    })

    const handleFormSubmit = (values) => {
        let newNote = {
            ...values,
            id: uuidv4(),
            name: 'Jonatan',
            favorite: false,
            src: 'https://github.com/Jonatank28.png',
            alt: 'Foto perfil Github',
            date: new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
        }

        console.log(newNote)
        setNotes([...notes, newNote])
        localStorage.setItem('notes', JSON.stringify([...notes, newNote]))

        setIsOpen(false)
    }

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes'))
        if (storedNotes) {
            setNotes(storedNotes)
        }
    }, [])

    return (
        <main className="bg-primary w-screen h-screen flex items-center justify-center">
            <div className="w-[100vw] h-[100vh] bg-primary grid grid-cols-12 gap-6 ">
                <div className="hidden lg:col-span-4 xl:col-span-3 2xl:col-span-2 bg-secondary rounded-md p-4 lg:flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                >
                                    <path
                                        d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    ></path>
                                    <path
                                        opacity="0.5"
                                        d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    ></path>
                                    <path
                                        d="M11.7769 10L16.6065 11.2941"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                    <path
                                        opacity="0.5"
                                        d="M11 12.8975L13.8978 13.6739"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <h1 className="text-xl text-primary font-bold">
                                Notas
                            </h1>
                        </div>
                        <div className="divider mt-8"></div>
                        {/* Links */}
                        <div className="mt-4 flex flex-col gap-2 ">
                            {dataLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
                                        hoverLinks === index ||
                                        selectedLinks === index
                                            ? 'bg-hover'
                                            : ''
                                    }`}
                                    onMouseEnter={() => setHoverLinks(index)}
                                    onMouseLeave={() => setHoverLinks(-1)}
                                    onClick={() => handleLinkClick(index)}
                                    style={{
                                        transition:
                                            'background-color 0.1s ease-in-out',
                                    }}
                                >
                                    <link.icon />
                                    <p>{link.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className="divider mt-4"></div>
                        {/* Tags */}
                        <div>
                            <h2 className="text-secondary mt-4">Tags</h2>
                            <div className="mt-4 flex flex-col gap-2">
                                {dataTags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
                                            hoverTags === index ||
                                            selectedTags === index
                                                ? 'bg-hover'
                                                : ''
                                        }`}
                                        onMouseEnter={() => setHoverTags(index)}
                                        onMouseLeave={() => setHoverTags(-1)}
                                        onClick={() => handleTagClick(index)}
                                        style={{
                                            transition:
                                                'background-color 0.1s ease-in-out',
                                        }}
                                    >
                                        <div>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-3 w-3 rotate-45 ${
                                                    tag.title === 'Pessoal'
                                                        ? 'fill-pessoal'
                                                        : tag.title ===
                                                          'Trabalho'
                                                        ? 'fill-trabalho'
                                                        : tag.title === 'Social'
                                                        ? 'fill-social'
                                                        : tag.title ===
                                                          'Importante'
                                                        ? 'fill-important'
                                                        : ''
                                                }`}
                                            >
                                                <path
                                                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <span
                                                className={` text-sm ${
                                                    tag.title === 'Pessoal'
                                                        ? 'fill-pessoal'
                                                        : tag.title ===
                                                          'Trabalho'
                                                        ? 'fill-trabalho'
                                                        : tag.title === 'Social'
                                                        ? 'fill-social'
                                                        : tag.title ===
                                                          'Importante'
                                                        ? 'fill-important'
                                                        : ''
                                                }`}
                                            >
                                                {tag.title}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            class="w-full btn btn-primary"
                            onClick={handleOpenModal}
                        >
                            Adicionar nova nota
                        </button>
                    </div>
                </div>
                {/* <div className="col-span-6 flex flex-wrap content-start justify-center gap-4 bg-secondary rounded-md p-4"> */}
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 2xl:col-span-10 flex flex-wrap content-start justify-center gap-4 bg-secondary rounded-md p-4">
                    <Card />
                    <Modal
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        title="Criar nova nota"
                        onSubmit={handleFormSubmit}
                    >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={NewNoteFormSchema}
                            onSubmit={handleFormSubmit}
                        >
                            <Form>
                                <div className="flex flex-col  mt-10">
                                    <div className="flex flex-col">
                                        <Inputt
                                            id="title"
                                            type="text"
                                            name="title"
                                            label="Título"
                                            placeholder="Título da nota"
                                        />
                                        <SelectField
                                            name="tag"
                                            // label="Tag"
                                            options={[
                                                {
                                                    label: 'sem tag',
                                                    value: 'sem tag',
                                                },
                                                {
                                                    label: 'Pessoal',
                                                    value: 'pessoal',
                                                },
                                                {
                                                    label: 'Trabalho',
                                                    value: 'trabalho',
                                                },
                                                {
                                                    label: 'Social',
                                                    value: 'social',
                                                },
                                                {
                                                    label: 'Importante',
                                                    value: 'important',
                                                },
                                            ]}
                                        />

                                        <Inputt
                                            id="content"
                                            as="textarea"
                                            rows="4"
                                            name="content"
                                            label="Descrição"
                                            placeholder="Descrição da nota"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 items-center mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="btn btn-danger-outline"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Adicionar nota
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </Modal>
                </div>
            </div>
        </main>
    )
}

export default Notes
