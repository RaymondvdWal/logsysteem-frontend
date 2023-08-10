
function Button({children, buttonType, buttonOnClick, className}) {

    return (
        <>
           <button
              className={className}
              type={buttonType}
              onClick={buttonOnClick}
           >
               {children}
           </button>
        </>
    )
}

export default Button;