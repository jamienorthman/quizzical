function StartQuiz(props) {
    return (
        <div className="start-quiz">
            <h1 className="title">Quizzical</h1>
            <p className="description">Test your skills with 5 Questions!</p>
            <button className="start-btn" onClick={props.handleClick}>
                Start quiz
            </button>
        </div>
    )
}

export default StartQuiz