import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import AnswerContext from "../../contexts/AnswerContext";

import { useContext } from "react"

import Question from "./Question";

import "../../styles/Questions.css"


const Questions = ({ questions }) => {

  const {
    deleteQuestion, setCurrentQuestion, toggleEditQuestion, setToggleEditQuestion 
  } = useContext(QuestionContext);

  const { 
    users, loggedUserInfo, successfulLogin 
  } = useContext(UserContext);
  
  const { answers } = useContext(AnswerContext)


  return (
    <div className="questions">
      <ul>
        {users &&
          questions.map(question => 
            <Question 
              key={question.id}
              question={question}
              deleteQuestion={deleteQuestion}
              users={users}
              loggedUserInfo={loggedUserInfo}
              answers={answers}
              setCurrentQuestion={setCurrentQuestion}
              successfulLogin={successfulLogin}
              toggleEditQuestion={toggleEditQuestion}
              setToggleEditQuestion={setToggleEditQuestion}
            />  
          )
        }
      </ul>
    </div>
  )
}
export default Questions;