import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";

import QuestionContext from "../contexts/QuestionContext";
import AnswerContext from "../contexts/AnswerContext";
import UserContext from "../contexts/UserContext";

import AddAnswerForm from "../components/Answer/AddAnswerForm";
import Answer from "../components/Answer/Answer"

import "../styles/QuestionPage.css"


const QuestionPage = () => {

  const navigation = useNavigate();

  const { 
    answers, toggleAddAnswer, setToggleAddAnswer
  } = useContext(AnswerContext);

  const { 
    users, loggedUserInfo, successfulLogin 
  } = useContext(UserContext);

  const { 
    currentQuestion, deleteQuestion, updateScore 
  } = useContext(QuestionContext);

  const author = users.find(user => user.id.toString() === currentQuestion.posterId.toString())

  const answersCount = answers.filter(answer => answer.questionId === currentQuestion.id).length

  const filteredAnswers = answers.filter(answer => answer.questionId === currentQuestion.id)

  const [upvoted, setUpvoted ] = useState(null)
  const [downvoted, setDownvoted] = useState(null)
  const [questionScore, setQuestionScore] = useState(currentQuestion.score)

  const toggleQuestionUpvote = () => {
    if (upvoted) {
      setQuestionScore(questionScore - 1)
    } else if (downvoted) {
      setQuestionScore(questionScore + 2)
    } else {
      setQuestionScore(questionScore + 1)
    }

    setUpvoted(!upvoted)
    setDownvoted(false)
  }

  const toggleQuestionDownvote = () => {
    if (downvoted) {
      setQuestionScore(questionScore + 1)
    } else if (upvoted) {
      setQuestionScore(questionScore - 2)
    } else {
      setQuestionScore(questionScore - 1)
    }

    setDownvoted(!downvoted)
    setUpvoted(false)
  }

  useEffect(() => {
    const newScore = {"score": questionScore}
    updateScore(currentQuestion.id, newScore)
  }, [upvoted, downvoted])


  const promptAnswerForm = () => {
    setToggleAddAnswer(true)
  }
  
  const handleDeleteQuestion = () => {
    deleteQuestion(currentQuestion.id)
    navigation('/')
  }


  return (

    <div className="question-page-wrapper">
      <div className="back-link">
        <Link to="/">Back to questions</Link>
      </div>

      <div className="question-wrapper">

        <div className="additional-info flex fsb">
          <span className="author">
            Author: {author && author.username}
          </span>
          <span className="date">
            Posted: {currentQuestion && currentQuestion.formattedDateAdded}
          </span>
          {/* <span className="modified"> */}
            {
              (loggedUserInfo && loggedUserInfo.id === currentQuestion.posterId && currentQuestion.isEdited) 
              &&
              <span className="modified">Modified</span>
            }
          {/* </span> */}
        </div>

        <div className="title">
          <h2>{currentQuestion && currentQuestion.title}</h2>
        </div>

        <div className="content-wrapper flex">
          <div className="score-wrapper">
            {
              successfulLogin ?
              <>
                <i className="upvote">
                  <button onClick={toggleQuestionUpvote}>^</button>
                </i>
                <p className="score">{currentQuestion && questionScore}</p>
                <i className="downvote">
                  <button onClick={toggleQuestionDownvote}>⌄</button>
                </i>
              </> 
              : <p className="score">{currentQuestion && questionScore}</p>
            }
            
          </div>

          <div className="content flex fvc">
            <p>
              {currentQuestion && currentQuestion.content}
            </p>
          </div>

        </div>
      </div>
      {
        (successfulLogin && loggedUserInfo && loggedUserInfo.id === currentQuestion.posterId) 
        &&
          <div className="manage">
            <button>Edit</button>
            <button 
              onClick={handleDeleteQuestion}
            >
              Delete
            </button>
          </div>
      }
      <div className="answers-menu-wrapper flex fvc fsb ">
        <div className="answer-count-wrapper">
          <span>Answers: {answersCount}</span>
        </div>
        { 
          successfulLogin &&
          <div className="add-answer-wrapper">
            <button onClick={promptAnswerForm}>Answer question</button>
          </div>
        }
      </div>

      <div className="answer-form-prompt"
       style={{display: !toggleAddAnswer ? 'none' : 'block'}}
      >
          <AddAnswerForm />
      </div>
      
      <div className="answers-wrapper">
          { filteredAnswers &&
            filteredAnswers.map(answer => 
              <Answer 
                key={answer.id}
                answer={answer}
                users={users}
                loggedUserInfo={loggedUserInfo}
                successfulLogin={successfulLogin}
              />
            )
          }
      </div>
    </div>
  )
}
export default QuestionPage;