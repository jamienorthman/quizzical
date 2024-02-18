function QuestionObject(props) {
    return (
        <>
            <div className="question-container">
                <h2>{props.question}</h2>
                
                <form className="options">
                    {props.children}
                </form>
                
            </div>
            <div className="divider"></div>
        </>
    )
}

export default QuestionObject