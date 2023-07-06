import { createContext, useState, useEffect } from "react";


const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {

  const [answers, setAnswers] = useState([]);
  const [toggleAddAnswer, setToggleAddAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('')

  const fetchAnswers = async () => {
    const fetchedAnswers = await fetch('http://localhost:4000/answers')
      .then(res => res.json());

      setAnswers(fetchedAnswers);
  }

  const addNewAnswer = async (newAnswer) => {
    await fetch('http://localhost:4000/answers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newAnswer)
    })
      .then(res => res.json());
      
      setAnswers([...answers, newAnswer]);
  }

  const updateAnswer = async (id, updatedAnswer) => {
    await fetch('http://localhost:4000/answers/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedAnswer)
    })
      .then(res => res.json());
      
      setAnswers(answers.map(answer => answer.id.toString() === id ? {...answer, ...updatedAnswer} : answer));
  }

  const deleteAnswer = async (id) => {
    await fetch('http://localhost:4000/answers/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json());

      setAnswers(answers.filter(answer => answer.id !== id))
  }

  const updateScore = async (id, updatedScore) => {
    await fetch('http://localhost:4000/answers/' + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedScore)
    })
      .then(res => res.json());
      
      setAnswers(answers.map(answer => answer.id.toString() === id ? {...answer, ...updatedScore} : answer));
  }

  useEffect(() => {
    fetchAnswers();
  }, [])

  return (
    <AnswerContext.Provider
      value={{
        answers,
        setAnswers,
        toggleAddAnswer,
        setToggleAddAnswer,
        addNewAnswer,
        deleteAnswer,
        currentAnswer,
        setCurrentAnswer,
        updateAnswer,
        updateScore
      }}
    >
      {children}
    </AnswerContext.Provider>
  )
}

export {AnswerProvider};
export default AnswerContext;