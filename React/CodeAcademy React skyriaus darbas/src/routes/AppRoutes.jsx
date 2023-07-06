import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import MainContent from "../components/MainContent/MainContent";
import AddPostForm from "../components/Posts/AddPostForm";
import Register from "../components/Register/Register";
import RootLayout from "../components/RootLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/home" element={<MainContent />}/>
          <Route path="/add_post" element={<AddPostForm />}/>
        </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes;