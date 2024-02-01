import { useState } from 'react'
import StartQuiz from './components/StartQuiz'
import QuestionsPage from './components/QuestionsPage'
import './style.css'

function App() {

  const [showQuiz, setShowQuiz] = useState(false)

  function startQuiz() {
    setShowQuiz(prevShowQuiz => !prevShowQuiz)
  }

  return (
    <>
      {!showQuiz ?
      <StartQuiz handleClick={startQuiz}/> :
      <QuestionsPage />
      }
    </>
  )
}

export default App
