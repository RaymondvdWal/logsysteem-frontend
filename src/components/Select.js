
function Select({children, errors, className,register, defaultValue,option, name, validation, value1, value2, value3, option1, option2, option3}) {


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