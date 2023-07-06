import { useState, useContext, useEffect } from "react";
import QuestionContext from "../../contexts/QuestionContext";


const EditQuestionForm = ({ currentQuestion, setToggleEdit }) => {

  const { updateQuestion } = useContext(QuestionContext);

  useEffect(() => {
      setFormInputs({
        title: currentQuestion.title,
        content: currentQuestion.content
      })
  }, [])

  const [formInputs, setFormInputs] = useState({
    title: '',
    content: ''
  });

  const handleInputs = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setFormInputs({...formInputs, [inputName]: inputValue});
  }

  const handleForm = (e) => {
    e.preventDefault();

    const question = {
      id: currentQuestion.id,
      posterId: currentQuestion.posterId,
      title: formInputs.title,
      content: formInputs.content,
      score: currentQuestion.score,
      isEdited: true,
      formattedDateAdded: currentQuestion.formattedDateAdded,
      rawDateAdded: currentQuestion.rawDateAdded,

    }

    updateQuestion(currentQuestion.id, question);
    setToggleEdit(false);
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

      <button type="submit">Edit</button>
      <button type="button" onClick={() => setToggleEdit(false)}>
        Cancel
      </button>
      <div>
        <span className="error"></span>
      </div>
    </form>
  )
}
export default EditQuestionForm;