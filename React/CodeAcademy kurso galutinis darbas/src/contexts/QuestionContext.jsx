import { createContext, useState, useEffect } from "react";


const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answersCount, setAnswersCount] = useState(0);
  const [toggleEditQuestion, setToggleEditQuestion] = useState(false);

  const fetchQuestions = async () => {
    const fetchedQuestions = await fetch('http://localhost:4000/questions')
      .then(res => res.json());

      setQuestions(fetchedQuestions);
  }

  const addNewQuestion = async (newQuestion) => {
    await fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    })
      .then(res => res.json());
      
      setQuestions([...questions, newQuestion]);
  }

  const updateQuestion = async (id, updatedQuestion) => {
    await fetch('http://localhost:4000/questions/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedQuestion)
    })
      .then(res => res.json());
      
      setQuestions(questions.map(question => question.id.toString() === id ? {...question, ...updatedQuestion} : question));
  }

  const updateScore = async (id, updatedScore) => {
    await fetch('http://localhost:4000/questions/' + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedScore)
    })
      .then(res => res.json());
      
      setQuestions(questions.map(question => question.id.toString() === id ? {...question, ...updatedScore} : question));
  }

  const deleteQuestion = async (id) => {
    await fetch('http://localhost:4000/questions/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json());

      setQuestions(questions.filter(question => question.id !== id))
  }

  useEffect(() => {
    fetchQuestions();
  }, [])


  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        addNewQuestion,
        deleteQuestion,
        currentQuestion,
        setCurrentQuestion,
        answersCount,
        setAnswersCount,
        toggleEditQuestion,
        setToggleEditQuestion,
        updateQuestion,
        updateScore
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export {QuestionProvider};
export default QuestionContext;