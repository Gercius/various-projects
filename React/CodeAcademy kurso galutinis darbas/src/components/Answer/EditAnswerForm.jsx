import { useState, useEffect } from "react"


const EditAnswerForm = ({
  currentAnswer, setToggleEdit, updateAnswer 
}) => {

  useEffect(() => {
      setFormInputs({content: currentAnswer.content})
  }, [])

  const [formInputs, setFormInputs] = useState({content: ''});

  const handleInputs = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setFormInputs({...formInputs, [inputName]: inputValue});
  }


  const handleForm = (e) => {
    e.preventDefault();

    const answer = {
      id: currentAnswer.id,
      posterId: currentAnswer.posterId,
      content: formInputs.content,
      score: currentAnswer.score,
      isEdited: true,
      formattedDateAdded: currentAnswer.formattedDateAdded,
      rawDateAdded: currentAnswer.rawDateAdded,
    }
    updateAnswer(currentAnswer.id, answer);

    setToggleEdit(false)
  }

  return (
    <form onSubmit={handleForm}>

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
    <button type="button" onClick={() => {setToggleEdit(false)}}>Cancel</button>
    <div>
      <span className="error"></span>
    </div>
  </form>
  )
}
export default EditAnswerForm;