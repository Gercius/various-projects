import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import QuestionContext from "../../contexts/QuestionContext";


const AskQuestionForm = () => {

  const navigation = useNavigate();

  const {loggedUserInfo} = useContext(UserContext);
  const {addNewQuestion} = useContext(QuestionContext);

  const [formInputs, setFormInputs] = useState({
    title: '',
    content: ''
  });

  const handleInputs = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setFormInputs({...formInputs, [inputName]: inputValue});
  }


  const handleForm = (e) => {
    e.preventDefault();

    const question = {
      id: crypto.randomUUID(),
      posterId: loggedUserInfo.id,
      title: formInputs.title,
      content: formInputs.content,
      score: 0,
      isEdited: false,
      formattedDateAdded: new Date().toLocaleString(),
      rawDateAdded: Date.now(),
    }

    addNewQuestion(question);
    navigation("/");
  }


  return (
    <form onSubmit={handleForm}>

      <div className="title">
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          name="title"
          value={formInputs.title}
          onChange={handleInputs}
          required
        />
      </div>

      <div className="content">
        <label htmlFor="content">Question</label>
        <textarea 
          type="text"
          name="content"
          value={formInputs.content}
          onChange={handleInputs}
          required
        />
      </div>

      <button type="submit">Submit Question</button>
      <Link to="/"><button>Cancel</button></Link>
      <div>
        <span className="error"></span>
      </div>
    </form>
  )
}
export default AskQuestionForm;