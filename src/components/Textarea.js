
function Textarea({id, name, placeholderText, register, validation, rows, cols}) {

    return (
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeholderText}
                    rows={rows}
                    cols={cols}
                    {...register(name, validation)}
                />

    )
}

export default Textarea