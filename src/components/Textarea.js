
function Textarea({id, name, errors, placeholderText, defaultValue, register, validation, rows, cols}) {

    return (

            <label>
                <textarea
                    id={id}
                    placeholder={placeholderText}
                    rows={rows}
                    cols={cols}
                    defaultValue={defaultValue}
                    {...register(name, validation)}
                />
                <p>{errors[name]?.message}</p>
            </label>
    )
}

export default Textarea