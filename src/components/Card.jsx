import { useState, useContext, useEffect, useRef } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import SelectField from '@/components/Form/Select'
import Modal from './dialog'
import { NotesContext } from '../contexts/notesContext'
import {
    FaEllipsisH,
    FaPencilAlt,
    FaRegTrashAlt,
    FaRegEye,
} from 'react-icons/fa'
import Inputt from './Form/Inputt'

const menuData = [
    {
        id: 1,
        title: 'Editar',
        icon: FaPencilAlt,
    },

    {
        id: 2,
        title: 'Excluir',
        icon: FaRegTrashAlt,
    },
    {
        id: 3,
        title: 'Visualizar',
        icon: FaRegEye,
    },
]

const Card = () => {
    // State que abre e fecha o modal de excluir a nota
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Menu que abre ao clicar no icone de tag
    const [isOpenTag, setIsOpenTag] = useState(false)
    // Menu que abre o menu do card ao clicar no icone de 3 pontinhos
    const [isOpenMenuCard, setIsOpenMenuCard] = useState(false)
    // Para saber qual tag foi selecionada
    const [selectedTagId, setSelectedTagId] = useState(null)
    // State que armazena a nota que está sendo editada
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    // Abrir e fechar o modal de editar a nota
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    // Abre modal para visualizar a nota completa
    const [isModalViewOpen, setIsModalViewOpen] = useState(false)
    // State que armazena a nota selecionada
    const [note, setNote] = useState({})
    const { notes, setNotes, dataTags } = useContext(NotesContext)
    const refDivTags = useRef(null)
    const refDivMenuCard = useRef(null)

    // Função que abre o modal Excluir
    const openModal = (note) => {
        setIsModalOpen(true)
        setNote(note)
    }

    // Função que fecha o modal Excluir
    const closeModal = () => {
        setIsModalOpen(false)
    }

    // Função que deleta a nota do card e do localStorage
    const deleteNote = (note) => {
        const filteredNotes = notes.filter((n) => n.id !== note.id)
        setNotes(filteredNotes)
        localStorage.setItem('notes', JSON.stringify(filteredNotes))
        closeModal()
    }

    // Função que abre menu da tag clicada
    const toggleMenuTag = (tagId, note) => {
        if (selectedTagId === tagId) {
            setIsOpenTag(!isOpenTag)
        } else {
            setIsOpenTag(true)
        }
        setSelectedTagId(tagId)
        setNote(note)
        console.log(note)
    }

    // Atualiza a tag da nota no localStorage e no state do contexto de notas
    const NewTagSelected = (tagId) => {
        const tags =
            tagId.title == 'Pessoal'
                ? 'pessoal'
                : tagId.title == 'Trabalho'
                ? 'trabalho'
                : tagId.title == 'Social'
                ? 'social'
                : tagId.title == 'Importante'
                ? 'important'
                : tagId.title == 'Todas as tags'
                ? 'sem tag'
                : ''
        const newNotes = notes.map((n) => {
            if (n.id === note.id) {
                return { ...n, tag: tags }
            }
            return n
        })
        localStorage.setItem('notes', JSON.stringify(newNotes))
        setNotes(newNotes)
        setIsOpenTag(false)
    }

    // Função que abre menu de edição do card
    const toggleMenuCard = (note) => {
        let id = note.id

        if (note.id === selectedNoteId) {
            setIsOpenMenuCard(!isOpenMenuCard)
        } else {
            setIsOpenMenuCard(true)
        }

        setSelectedNoteId(id)
        setNote(note)
    }

    // Função que verifica qual opção do menu do card foi selecionada e faz a ação correspondente
    const handleMenuCard = (note, id) => {
        if (id === 1) {
            openModalEdit(note)
        } else if (id === 2) {
            setIsModalOpen(true)
        } else {
            openModalView(note)
        }
    }

    // Função que abre o modal de visualizar a nota // id do link clicado = 3
    const openModalView = (note) => {
        setIsModalViewOpen(true)
        setNote(note)
        console.log(note)
    }

    // Função que fecha o modal de visualizar a nota // id do link clicado = 3
    const closeModalView = () => {
        setIsModalViewOpen(false)
    }

    const initialValues = {
        title: note.title,
        content: note.content,
        tag: note.tag,
    }

    const editNoteSchema = Yup.object().shape({
        title: Yup.string().required('Obrigatório'),
        content: Yup.string().required('Obrigatório'),
        tag: Yup.string().required('Obrigatório'),
    })

    // Função que abre o modal de editar a nota // id do link clicado = 1
    const openModalEdit = (note) => {
        setIsModalEditOpen(true)
        setNote(note)
    }

    // Função que fecha o modal de editar a nota // id do link clicado = 1
    const closeModalEdit = () => {
        setIsModalEditOpen(false)
    }

    // Função que edita a nota no localStorage e no state do contexto de notas
    const editNoteSubmit = (values) => {
        const newNotes = notes.map((n) => {
            if (n.id === note.id) {
                return { ...n, ...values }
            }
            return n
        })
        localStorage.setItem('notes', JSON.stringify(newNotes))
        setNotes(newNotes)
        closeModalEdit()
    }

    // Função que favorita a nota
    const HandleIconFarorite = (note) => {
        const newNotes = notes.map((n) => {
            if (n.id === note.id) {
                return { ...n, favorite: !note.favorite }
            }
            return n
        })
        localStorage.setItem('notes', JSON.stringify(newNotes))
        setNotes(newNotes)
    }

    // Função que fecha o menu de tags ou o de Card ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                refDivTags.current &&
                !refDivTags.current.contains(event.target)
            ) {
                setIsOpenTag(false)
                setSelectedTagId(null)
                setNote({})
            }
            if (
                refDivMenuCard.current &&
                !refDivMenuCard.current.contains(event.target)
            ) {
                setIsOpenMenuCard(false)
                setSelectedNoteId(null)
                setNote({})
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        // Div do card
        <>
            {notes.map((note) => (
                <div
                    className={`w-[350px] p-5 rounded-md bg-white dark:bg-primary shadow-md dark:shadow-sm ${
                        note.tag === 'pessoal'
                            ? 'shadow-blue-300 dark:shadow-blue-300'
                            : note.tag === 'trabalho'
                            ? 'shadow-green-300 dark:shadow-green-300'
                            : note.tag === 'social'
                            ? 'shadow-yellow-300 dark:shadow-yellow-300'
                            : note.tag === 'important'
                            ? 'shadow-red-300 dark:shadow-red-300'
                            : note.tag === 'Todas as tags'
                            ? 'shadow-gray-300 dark:shadow-gray-300'
                            : ''
                    }`}
                >
                    {/* Div do titulo/hora e menu q abre opções ao clicar*/}
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            {/* Titulo e hora*/}
                            <div className="flex gap-2 items-center">
                                {/* Div com foto */}
                                <div>
                                    <img
                                        src={note.src}
                                        alt={note.alt}
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                                {/* Div com titulo e hora */}
                                <div>
                                    <p className="text-primary text-sm font-semibold">
                                        {note.name}
                                    </p>
                                    <p className="text-secondary text-sm">
                                        {note.date}
                                    </p>
                                </div>
                            </div>
                            {/* Conteudo */}
                            <div className="mt-4">
                                <h2 className="text-primary text-sm font-semibold">
                                    {note.title}
                                </h2>
                                <p className="text-secondary text-sm mt-2">
                                    {note.content}
                                </p>
                            </div>
                        </div>
                        {/* Abre menu de opções do ao clicar */}
                        <div
                            className="cursor-pointer relative"
                            onClick={() => toggleMenuCard(note)}
                        >
                            <FaEllipsisH className="rotate-90" />
                            {/* Menu de opções do card*/}
                            {isOpenMenuCard && selectedNoteId == note.id && (
                                <div
                                    className="absolute bg-secondary top-5 right-3 rounded-md shadow-md flex flex-col gap-1 py-2"
                                    ref={refDivMenuCard}
                                >
                                    {menuData.map((menu, index) => (
                                        <div
                                            onClick={() =>
                                                handleMenuCard(note, menu.id)
                                            }
                                            key={index}
                                            className="hover:bg-hover flex gap-2 items-center px-2 py-1"
                                        >
                                            <menu.icon className="h-3 w-3" />
                                            <p className="text-primary text-sm">
                                                {menu.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="flex justify-between mt-4">
                        <div className="cursor-pointer p-1 relative">
                            {/* Icone de tag */}

                            <svg
                                onClick={() => toggleMenuTag(note.id, note)}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-3 w-3 rotate-45 ${
                                    note.tag === 'pessoal'
                                        ? 'fill-pessoal'
                                        : note.tag === 'trabalho'
                                        ? 'fill-trabalho'
                                        : note.tag === 'social'
                                        ? 'fill-social'
                                        : note.tag === 'important'
                                        ? 'fill-important'
                                        : note.tag === 'Todas as tags'
                                        ? 'shadow-gray-300 dark:shadow-gray-300'
                                        : ''
                                }`}
                            >
                                <path
                                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                ></path>
                            </svg>
                            {isOpenTag && selectedTagId === note.id && (
                                <div
                                    className="absolute bg-secondary  top-6 rigght-0 rounded-md shadow-md "
                                    ref={refDivTags}
                                >
                                    {dataTags.map((tag, index) => (
                                        <div
                                            className="flex items-center gap-2 hover:bg-hover hover:rounded-md p-2"
                                            onClick={() => NewTagSelected(tag)}
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
                                                            : tag.title ===
                                                              'Social'
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
                                                            : tag.title ===
                                                              'Social'
                                                            ? 'fill-social'
                                                            : tag.title ===
                                                              'Importante'
                                                            ? 'fill-important'
                                                            : ''
                                                    }`}
                                                >
                                                    {tag.title ===
                                                    'Todas as tags'
                                                        ? 'Sem tag'
                                                        : tag.title}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Icone de lixeira para deletar */}
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="text-red-400"
                                    onClick={() => openModal(note)}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            d="M20.5001 6H3.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        ></path>
                                        <path
                                            d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        ></path>
                                        <path
                                            opacity="0.5"
                                            d="M9.5 11L10 16"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        ></path>
                                        <path
                                            opacity="0.5"
                                            d="M14.5 11L14 16"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        ></path>
                                        <path
                                            opacity="0.5"
                                            d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            {/* // Icone favorito */}
                            <div
                                className="cursor-pointer"
                                onClick={() => HandleIconFarorite(note)}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    className={`text-yellow-400 fill-primary hover:fill-yellow-400 active:animate-bounce ${
                                        note.favorite ? 'fill-yellow-400' : ''
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* Modal de exclusão */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmitModal={() => deleteNote(note)}
                title="Excluir nota"
                DivClass="mt-6 flex justify-between items-center"
                btn1Text="Cancelar"
                btn1Class="btn btn-danger-outline"
                btn2Text="Excluir"
                btn2Class="btn btn-primary"
            >
                <p className="">
                    Tem certeza que deseja excluir a nota
                    <span className="font-bold"> {note.title}</span>?
                </p>
            </Modal>

            {/* Modal de edição */}
            <Modal
                isOpen={isModalEditOpen}
                onClose={closeModalEdit}
                onSubmitModal={{}}
                title="Editar nota"
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={editNoteSchema}
                    onSubmit={editNoteSubmit}
                >
                    <Form>
                        <div className="flex flex-col  mt-10">
                            <div className="flex flex-col">
                                <Inputt
                                    id="title"
                                    type="text"
                                    name="title"
                                    defaultValue={note.title}
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
                                    defaultValue={note.content}
                                    label="Descrição"
                                    placeholder="Descrição da nota"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center mt-6">
                            <button
                                type="button"
                                onClick={closeModalEdit}
                                className="btn btn-danger-outline"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Adicionar nota
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
            {/* Modal de visualização */}
            <Modal
                isOpen={isModalViewOpen}
                onClose={closeModalView}
                onSubmitModal={{}}
                title="Visualizar nota"
                className="border border-red-300"
            >
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{note.date}</p>
                    <p
                        className={` capitalize
                            ${
                                note.tag === 'pessoal'
                                    ? 'fill-pessoal-view'
                                    : note.tag === 'trabalho'
                                    ? 'fill-trabalho'
                                    : note.tag === 'social'
                                    ? 'fill-social'
                                    : note.tag === 'important'
                                    ? 'fill-important'
                                    : ''
                            }
                        `}
                    >
                        {note.tag == 'important' ? 'Importante' : note.tag}
                    </p>
                </div>
                <h1 className=" mt-2 text-lg font-bold">{note.title}</h1>
                <p className="mt-4 text-sm ">{note.content}</p>
            </Modal>
        </>
    )
}

export default Card
