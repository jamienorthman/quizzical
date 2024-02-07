import { useState, useEffect } from 'react'
import QuestionObject from './QuestionObject'
import Option from './Option'
import { decode } from 'html-entities'
import { v4 as uuidv4 } from 'uuid';

function QuestionsPage() {

    const [allQuestions, setAllQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [options, setOptions] = useState([
      {name: 'option1', selected: false},
      {name: 'option2', selected: false},
      {name: 'option3', selected: false},
      {name: 'option4', selected: false}
    ])

    const handleChange = (e) => {
      setOptions(prev => {
          return prev.map(item => { 
              if (item.name == e.target.value) {
                  return {...item, selected: true}
              } else return {...item, selected: false}
          })
      })
    }

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
          .then(res => res.json())
          .then((data) => {
            console.log(data)
            setLoading(false)
            const updatedQuestions = data.results.map(question => {
              const optionsArr = question.incorrect_answers
              const randomIndex = Math.floor(Math.random() * (optionsArr.length))
              const combinedOptions = optionsArr.toSpliced(randomIndex, 0, question.correct_answer)
              question.individualOptions = combinedOptions.map(option => {
                return (
                  <Option 
                    key={uuidv4()}
                    option={option} 
                    text={decode(option)}
                    id={option.name}
                    checked={option.selected}
                    handleChange={handleChange}
                  />
                )
              })
              setOptions([...options, question.individualOptions])
              question.id = uuidv4()
              return question
            })
            setAllQuestions(updatedQuestions)
          })
          .catch(error => {
            console.error('Error fetching data:', error)
            setLoading(false)
          })
    }, [])

      if (loading) {
        return <h3>Loading...</h3>
      }

      if (!allQuestions) {
        return <h3>No quiz data available.</h3>
      }
    
    const questionList = allQuestions.map(object => {
      return (
        <QuestionObject
          key={object.id}
          question={decode(object.question)}
          options={object.individualOptions}
        />
      )
    })

    console.log(options)

    return (
        <div className="main">
            <div className="questions">
                {questionList}
            </div>
            <button>Check answers</button>
        </div>
    )
}

export default QuestionsPage