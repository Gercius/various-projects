import QuestionContext from "../contexts/QuestionContext"
import UserContext from "../contexts/UserContext"

import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import Questions from "../components/Question/Questions"

import "../styles/Homepage.css"


const Homepage = () => {

  const { questions } = useContext(QuestionContext);
  const { successfulLogin } = useContext(UserContext);

  const [toggleSortedByDate, setToggleSortedByDate] = useState(false);


  const sortedByDate = [...questions].sort((a, b) => 
  a.rawDateAdded - b.rawDateAdded).reverse()

  const handleSorting = (e) => {
    if (e.target.name === 'SortByDate') {
      setToggleSortedByDate(!toggleSortedByDate)
    } else if (e.target.name === 'SortByAnswered') {
      console.log('ANSWERED');
    } else if (e.target.name === 'SortByUnanswered') {
      console.log('UNANSWERED');
    }
  }
  
  // const logShit = () => {
  //   console.log(sortedByDate)
  //   console.log(toggleSortedByDate)
  //   console.log(questions)
  // }

  
  return (
    <div className="homepage-wrapper">
      {successfulLogin &&
        <div className="ask-btn">
          <Link to="/new-question">
            <button className="ask">Ask Question</button>
          </Link>
        </div>
      }
      <h2 className="question-count">
        Total questions: {questions.length}
      </h2>

      <div className="sort-panel">
        <span>Sort by: </span>
        <button 
          name="SortByDate"
          onClick={handleSorting}
        >
          Newest
        </button>
        <button
          name="SortByAnswered"
          onClick={handleSorting}>
          Answered
          </button>
        <button
          name="SortByUnanswered"
          onClick={handleSorting}>
          Unanswered
        </button>
        {/* <button onClick={logShit}>Log shit</button> */}
      </div>
      <Questions 
        questions={toggleSortedByDate ?  sortedByDate : questions}
      />
    </div>
  )
}
export default Homepage;