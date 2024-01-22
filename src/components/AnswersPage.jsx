function AnswersPage() {
    return (
        <div className="main">
            <div className="questions">
                <div className="question-container">
                    <h2></h2>
                    <div className="options">

                    </div>
                    <div className="divider"></div>
                </div>
            </div>
            <div className="score-container">
                <h3>You scored 3/5 correct answers</h3>
                <button>Play again</button>
            </div>
        </div>
    )
}

export default AnswersPage