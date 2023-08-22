
function Textarea({id, name, placeholderText, defaultValue, register, validation, rows, cols}) {

    return (
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeholderText}
                    rows={rows}
                    cols={cols}
                    defaultValue={defaultValue}
                    {...register(name, validation)}
                />

    )
}

export default Textarea