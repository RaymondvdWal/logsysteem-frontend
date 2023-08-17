
function Select({children, className,register,option, name, validation, value1, value2, value3, option1, option2, option3}) {


    return (
        <label className={className}>
            {children}
            <select
                {...register(name, validation)}
            >
                {option}
                {/*<option value={value1}>{option1}</option>
                <option value={value2}>{option2}</option>
                <option value={value3}>{option3}</option>*/}
            </select>


        </label>
    )
}

export default Select;