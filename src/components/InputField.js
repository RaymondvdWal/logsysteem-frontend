

function InputField({id, type, register, name, validation, children, errors, placeholderText}) {


    return (
        <>
            <label htmlFor={id}>
                {children}
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholderText}
                />
            </label>

            {/*{errors[name] && <p>{errors[name].message}</p>}*/}

        </>
    );
}

export default InputField;