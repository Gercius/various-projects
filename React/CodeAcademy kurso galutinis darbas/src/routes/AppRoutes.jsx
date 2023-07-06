import { BrowserRouter, Routes, Route } from "react-router-dom"

import EditQuestionForm from "../components/Question/EditQuestionForm"

import MainLayout from "../layouts/MainLayout"

import AskQuestionPage from "../pages/AskQuestionPage"
import Homepage from "../pages/Homepage"
import LoginPage from "../pages/LoginPage"
import QuestionPage from "../pages/QuestionPage"
import QuestionsPage from "../pages/QuestionsPage"
import RegisterPage from "../pages/RegisterPage"


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >

          <Route index element={<Homepage />} />
          <Route path="new-question" element={<AskQuestionPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route 
            path="questions/:questionId" 
            element={<QuestionPage />}
          />
          <Route 
            path="/edit-question/:id" 
            element={<EditQuestionForm />} 
          />
    
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
            
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes;