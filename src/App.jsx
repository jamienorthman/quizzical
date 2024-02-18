import { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import StartQuiz from './components/StartQuiz'
import QuizPage from './components/QuizPage'
import './style.css'

function App() {

  const [showQuiz, setShowQuiz] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  const query = `api.php?amount=5&type=multiple&difficulty=easy`

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(`https://opentdb.com/${query}`)
        const data = await res.json()
        console.log(data)
        setLoading(false)
        const updatedQuestions = data.results.map(question => {
          const optionsArr = question.incorrect_answers
          const randomIndex = Math.floor(Math.random() * (optionsArr.length))
          question.combinedOptions = optionsArr.toSpliced(randomIndex, 0, question.correct_answer)
          return {
            question: decode(question.question),
            correctAnswer: decode(question.correct_answer),
            options: question.combinedOptions
          }
        })
        setAllQuestions(updatedQuestions)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    } 
    getQuestions()
  }, [])

    if (loading) {
      return <h3>Loading...</h3>
    }

    if (!allQuestions) {
      return <h3>No quiz data available.</h3>
    }

  function startQuiz() {
    setShowQuiz(true)
  }

  return (
    <>
      {showQuiz ?
      <QuizPage questions={allQuestions}/> :
      <StartQuiz handleClick={startQuiz}/>
      }
    </>
  )
}

export default App
