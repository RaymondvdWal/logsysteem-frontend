

function InputField({id, type, register, name, validation, editable, children, errors, placeholderText, value, onChange}) {


    return (
        <>
            <label htmlFor={id}>
                {children}
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholderText}
                    onChange={onChange}
                    contentEditable={editable}
                    {...register(name, validation)}
                />
            </label>

            {/*{errors[name] && <p>{errors[name].message}</p>}*/}

        </>
    );
}

export default InputField;