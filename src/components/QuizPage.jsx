import { useState, useEffect } from 'react'
import QuestionObject from './QuestionObject'
import { decode } from 'html-entities'
import { v4 as uuidv4 } from 'uuid'

function QuizPage({ questions }) {
    const [quizData, setQuizData] = useState([])
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)

    useEffect(() => {
      const updateQuiz = () => {
        const updatedQuiz = questions.map(question => {
          return {
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            selected: false,
            selectedAnswer: "",
          }
        })
        setQuizData(updatedQuiz)
      }
      updateQuiz()
    }, [])

    function handleChange(e, optionIndex) {
      const { value } = e.target
      const updatedData = [...quizData]
      updatedData[optionIndex] = {
        ...updatedData[optionIndex],
        selected: true,
        selectedAnswer: value
      }
      setQuizData(updatedData)
    }

    function displayTotalScore() {
      countCorrect()
      setShowScore(true)
    }

    function displayStyledAnswers(optionIndex, option) {
      if (isChecked(optionIndex, option) && 
          option !== quizData[optionIndex].correctAnswer
      ) {
        return {backgroundColor: "rgb(235, 158, 158)"}
      }
      if (isChecked(optionIndex, option) && 
          option === quizData[optionIndex].correctAnswer
      ) {
        return {backgroundColor: "rgb(99, 210, 99)"}
      }
      if (option === quizData[optionIndex].correctAnswer) {
        return {backgroundColor: "rgb(99, 210, 99)"}
      }
    }

    function countCorrect() {
      let amountCorrect = 0
      quizData.forEach(item => {
        if (item.selectedAnswer === item.correctAnswer) {
          amountCorrect += 1
        }
      })
      setScore(prevScore => prevScore + amountCorrect)
    }

    function isChecked(optionIndex, option) {
      return quizData[optionIndex].selectedAnswer === option
    }

    function resetQuiz() {
      location.reload()
    }

    const questionList = quizData.map((object, optionIndex) => {
      return (
        <QuestionObject
          key={uuidv4()}
          question={object.question}>
          {object.options.map(option => (
            <div> 
              <input 
                type="radio"
                name={`question-${optionIndex}`}
                value={decode(option)}
                key={uuidv4()}
                option={decode(option)} 
                id={decode(option)}
                checked={isChecked(optionIndex, option)}
                onChange={(e) => handleChange(e, optionIndex)}
              />
              <label 
                htmlFor={decode(option)}
                style={showScore ? displayStyledAnswers(optionIndex, option): null}
              >
                  {decode(option)}
              </label>
            </div>
          ))}
        </QuestionObject>
      )
    })

  return (
      <div className="main">
          <div className="questions">
              {questionList}
          </div>
          
          { !showScore ?
          <div className="score-replay">
            <button 
              onClick={displayTotalScore}
              className="check-answers-btn">
                Check answers
            </button> 
          </div>  :
          <div className="score-replay">
            <h3>You scored {score}/5 correct answers</h3>
            <button onClick={resetQuiz}>Play again</button> 
          </div> }
            
      </div>
  )
}

export default QuizPage