import AnswerContext from "../../contexts/AnswerContext"
import { useContext, useEffect, useState } from "react"
import EditAnswerForm from "./EditAnswerForm";

import "../../styles/Answer.css"

const Answer = ({ answer, users, loggedUserInfo, successfulLogin }) => {

  const { 
    deleteAnswer, updateScore, updateAnswer 
  } = useContext(AnswerContext);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [upvoted, setUpvoted ] = useState(null)
  const [downvoted, setDownvoted] = useState(null)
  const [answerScore, setAnswerScore] = useState(answer.score)

  const toggleAnswerUpvote = () => {
    if (upvoted) {
      setAnswerScore(answerScore - 1)
    } else if (downvoted) {
      setAnswerScore(answerScore + 2)
    } else {
      setAnswerScore(answerScore + 1)
    }

    setUpvoted(!upvoted)
    setDownvoted(false)
  }

  const toggleAnswerDownvote = () => {
    if (downvoted) {
      setAnswerScore(answerScore + 1)
    } else if (upvoted) {
      setAnswerScore(answerScore - 2)
    } else {
      setAnswerScore(answerScore - 1)
    }

    setDownvoted(!downvoted)
    setUpvoted(false)
  }

  useEffect(() => {
    const newScore = {"score": answerScore}
    updateScore(answer.id, newScore)
  }, [upvoted, downvoted])

  const author = users.find(user => user.id.toString() === answer.posterId.toString())

  const handleEdit = () => {
    setToggleEdit(!toggleEdit)
  }


  return (
    <div className="answer-wrapper">

      <div className="content-wrapper flex">
        <div className="score-wrapper">
          {
            successfulLogin ?
              <>
                <i className="upvote">
                  <button onClick={toggleAnswerUpvote}>^</button>
                </i>
                <p className="score">{answer.score}</p>
                <i className="downvote">
                  <button onClick={toggleAnswerDownvote}>⌄</button>
                </i>
              </>
            : 
              <p className="score">{answer.score}</p>
          }
        </div>

        <div className="content flex fvc">
          <p>{answer.content}</p>
        </div>
      </div>

      <div className="additional-info">
        <span className="author">Author: {author && author.username}</span>
        <span className="date">
          Posted: {answer.formattedDateAdded}
        </span>
        <span className="modified">
          {
            (loggedUserInfo && loggedUserInfo.id === answer.posterId 
              && answer.isEdited) &&
            <span className="modified">Modified</span>
          }
        </span>
      </div>
      {
        (loggedUserInfo && loggedUserInfo.id === answer.posterId) 
        &&
        <div className="manage">
          <button onClick={handleEdit}>Edit</button>
          <button 
            onClick={() => deleteAnswer(answer.id)}
          >
            Delete
          </button>
        </div>
      }
      {
        toggleEdit &&
          <div className="prompt-answer-edit">
            <EditAnswerForm 
              currentAnswer={answer} 
              setToggleEdit={setToggleEdit}
              updateAnswer={updateAnswer}
              updateScore={updateScore}
            />
          </div>
      }
    </div>
  )
}
export default Answer