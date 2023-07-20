
function Button({children, buttonType, buttonOnClick}) {

    return (
        <>
           <button
              type={buttonType}
              onClick={buttonOnClick}
           >
               {children}
           </button>
        </>
    )
}

export default Button;