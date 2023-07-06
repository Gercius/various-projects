import { useState, useContext } from "react"

import UserContext from "../../contexts/UserContext";
import AnswerContext from "../../contexts/AnswerContext";
import QuestionContext from "../../contexts/QuestionContext";


const AddAnswerForm = () => {


  const { loggedUserInfo } = useContext(UserContext);
  const { currentQuestion } = useContext(QuestionContext);
  const { addNewAnswer, setToggleAddAnswer } = useContext(AnswerContext);

  const [formInputs, setFormInputs] = useState({content: ''});

  const handleInputs = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setFormInputs({...formInputs, [inputName]: inputValue});
    
  }

  const handleForm = (e) => {
    e.preventDefault();

    const newAnswer = {
      id: crypto.randomUUID(),
      posterId: loggedUserInfo.id,
      questionId: currentQuestion.id,
      content: formInputs.content,
      score: 0,
      iEdited: false,
      formattedDateAdded: new Date().toLocaleString(),
      rawDateAdded: Date.now()
    }
    
    addNewAnswer(newAnswer)
    setToggleAddAnswer(false)
    setFormInputs({
      id: '',
      posterId: '',
      questionId: '',
      content: '',
    })

  }

  const closeForm = () => {
    setToggleAddAnswer(false)
  }


  return (
    <form onSubmit={handleForm}>

      <div className="content">
        <label htmlFor="content">Answer</label>
        <textarea 
          type="text"
          name="content"
          value={formInputs.content}
          onChange={handleInputs}
          required
        />
      </div>

    <button type="submit">Submit Question</button>
    <button type="button" onClick={closeForm}>Cancel</button>
    <div>
      <span className="error"></span>
    </div>
  </form>
  )
}
export default AddAnswerForm