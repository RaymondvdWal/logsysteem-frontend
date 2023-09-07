
function Select({children, errors, className,register, defaultValue,option, name, validation}) {


    return (
        <label className={className}>
            {children}
            <select
                defaultValue={defaultValue}
                {...register(name, validation)}
            >
                {option}
            </select>
            <p>{errors[name]?.message}</p>
        </label>
    )
}

export default Select;