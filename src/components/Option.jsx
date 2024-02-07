function Option({option, text, handleChange}) {
    
    const {id, selected} = option

    return (
        <div>
                <input 
                    type="radio"
                    name="option"
                    id={id}
                    checked={selected}
                    onChange={handleChange}
                    className="option">
                </input>
                <label htmlFor={id}>{text}</label>
        </div>
    )
}

export default Option