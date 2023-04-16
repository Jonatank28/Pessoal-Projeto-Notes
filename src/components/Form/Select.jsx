import React from 'react'
import { useField } from 'formik'
import { IoIosArrowDown } from 'react-icons/io'

function SelectField({ label, options, ...props }) {
    const [field, meta] = useField(props.name)

    return (
        <div className="mb-6 py-2">
            <label
                htmlFor={props.name}
                className="block font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    {...field}
                    {...props}
                    className="block  appearance-none w-full bg-secondary text-primary py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none "
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className=" absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 cursor-pointer hover:text-primary ">
                    <IoIosArrowDown className="h-4 w-4" />
                </div>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default SelectField
