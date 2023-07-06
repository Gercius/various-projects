import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import EditQuestionForm from "./EditQuestionForm";

import "../../styles/Question.css"


const Question = ({ 
  question, users, loggedUserInfo, answers, deleteQuestion, successfulLogin, setCurrentQuestion 
}) => {

  const [isModified, setIsModified] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const author = users.find(user => 
    user.id.toString() === question.posterId.toString());

  const answersCount = answers.filter(answer => answer.questionId === question.id).length

  const handleQuestionEdit = () => {
    setToggleEdit(!toggleEdit)
  }

  const handleCurrentQuestion = () => {
    setCurrentQuestion(question)
  }

  useEffect(() => {
    if (loggedUserInfo && loggedUserInfo.id === question.posterId) {
      setIsModified(question.isEdited)
    }
  }, [])


  return (
    <li className="question">
      <div className="question-wrapper">

        <div className="title-wrapper">
          <Link 
            to={`/questions/${question.id}`}
            onClick={handleCurrentQuestion}  
          >
            <h3 className="title">{question.title}</h3>
          </Link>
        </div>

        <div className="content-wrapper flex fc">
          <span className="score">{question.score} votes</span>
          <p className="content">{question.content}</p>
        </div>

        <div className="additional-info flex fsb">
          <span className="answer-count">Answers: {answersCount}</span>
          <span className="date">
            Posted: {question.formattedDateAdded}
          </span>
          <span className="author">
            Author: {author && author.username}
          </span>
          { successfulLogin && isModified
              && <span className="modified">Modified</span>
          }
        </div>
        {
          (successfulLogin && loggedUserInfo && loggedUserInfo.id === question.posterId) 
          &&
            <div className="manage">
              <button onClick={handleQuestionEdit}>Edit</button>
              <button 
                onClick={() => deleteQuestion(question.id)}
              >
                Delete
              </button>
            </div>
        }
        {
          toggleEdit &&
            <div className="edit-prompt">
              <EditQuestionForm
                currentQuestion={question}
                setToggleEdit={setToggleEdit}
              />
            </div>
        }
      </div>
    </li>
  )
}
export default Question;