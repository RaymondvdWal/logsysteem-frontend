

function InputField({id, type, register, name, defaultValue, disable, validation, editable, children, errors, placeholderText, value, onChange}) {


    return (
        <>
            <label htmlFor={id}>
                {children}
                <input
                    type={type}
                    id={id}
                    value={value}
                    placeholder={placeholderText}
                    onChange={onChange}
                    contentEditable={editable}
                    disabled={disable}
                    defaultValue={defaultValue}
                    {...register(name, validation)}
                />
                <p>{errors[name]?.message}</p>
            </label>
        </>
    );
}

export default InputField;