function QuestionObject(props) {
    return (
        <>
            <div className="question-container">
                <h2>{props.question}</h2>
                <div className="options">
                    {props.options}
                </div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default QuestionObject