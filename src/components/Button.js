
function Button({children, buttonType, buttonOnClick, className, value, disabled}) {

    return (
        <>
           <button
              className={className}
              type={buttonType}
              onClick={buttonOnClick}
              value={value}
              disabled={disabled}
           >
               {children}
           </button>
        </>
    )
}

export default Button;