import React from 'react'

const NewNoteForm = () => {
    return (
        <form action="submit">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="input"
                    />
                </div>
            </div>
        </form>
    )
}

export default NewNoteForm
