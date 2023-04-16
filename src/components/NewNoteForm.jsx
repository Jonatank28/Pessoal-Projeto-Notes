// Novo componente que irá conter o Formik e o Form

import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Inputt from '../components/Form/Inputt'
import { FaUser } from 'react-icons/fa'

function NewNoteForm({ initialValues, validationSchema, onSubmit }) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                {/* Renderize o componente filho como uma propriedade */}
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <div className="flex flex-col mt-10">
                        <div className="flex flex-col">
                            <Inputt
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Nome"
                                icon={FaUser}
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && errors.name}
                            />
                        </div>
                    </div>
                )}
            </Form>
        </Formik>
    )
}

// Componente original que irá renderizar o Modal e chamar o novo componente
function CreateNoteModal() {
    const initialValues = { name: '' }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
    })

    const handleFormSubmit = (values, actions) => {
        // Aqui você pode colocar a lógica para enviar o formulário
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            title="Criar nova nota"
            onSubmitModal={handleFormSubmit}
            DivClass="flex justify-end gap-2 items-center mt-6"
            btn1Class="btn btn-danger-outline"
            btn1Text="Cancelar"
            btn2Class="btn btn-primary"
            btn2Text="Adicionar nota"
        >
            {/* Renderize o novo componente dentro do Modal */}
            <NewNoteForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            />
        </Modal>
    )
}

export default CreateNoteModal
