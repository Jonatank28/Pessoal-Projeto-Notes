import { Field, ErrorMessage } from 'formik'

const Inputt = ({ id, type, name, placeholder, value, ...props }) => {
    return (
        <>
            <div className="mb-4  py-2 ">
                <Field
                    className="appearance-none bg-secondary border-none w-full text-primary mr-3 p-2 leading-tight focus:outline-none rounded-md "
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    {...props}
                />
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-600 text-xs"
                />
            </div>
        </>
    )
}

export default Inputt
