
function Select({children, className,register, name, validation}) {


    return (
        <label className={className}>
            {children}
            <select
                {...register(name, validation)}
            >
                <option value="user">Medewerker</option>
                <option value="moderator">Specialist</option>
                <option value="admin">Admin</option>
            </select>


        </label>
    )
}

export default Select;