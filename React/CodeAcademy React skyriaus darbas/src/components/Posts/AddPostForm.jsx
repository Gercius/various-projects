import PostContext from "../../contexts/PostContext";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./AddPostForm.css"


const AddPostForm = () => {

  const { addNewPost } = useContext(PostContext);

  const navigation = useNavigate();

  const [formInputs, setFormInputs] = useState({
    title: '',
    content: ''
  });

  const handleInputs = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormInputs({...formInputs, [inputName]: inputValue});
  }

  const handleForm = (e) => {
    e.preventDefault();

    const newPost = {
      title: formInputs.title,
      content: formInputs.content,
      id: crypto.randomUUID()
    }

    addNewPost(newPost);
    navigation('/home');
  }

  return (
    <>
      <div className="add-post-form-wrapper">
        <form onSubmit={handleForm}>
          <div className="input-field">
            <label htmlFor="">Title</label>
            <input 
              type="text" 
              name="title"
              id="title"
              required
              value={formInputs.title}
              onChange={handleInputs}
            />
          </div>

          <div className="input-field">
            <label htmlFor="">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              rows={8}
              cols={40}
              required

              value={formInputs.content}
              onChange={handleInputs}
            />
          </div>
          
          <div className="btn">
            <button type="submit">Add post</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddPostForm;