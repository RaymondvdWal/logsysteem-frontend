
function Button({children, buttonType, buttonOnClick, className, value}) {

    return (
        <>
           <button
              className={className}
              type={buttonType}
              onClick={buttonOnClick}
              value={value}
           >
               {children}
           </button>
        </>
    )
}

export default Button;