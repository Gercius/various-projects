import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Login from "./Login/Login";

import UserContext from "../contexts/UserContext";
import { useContext } from "react";

import { Outlet } from "react-router-dom";

import "./RootLayout.css"


const RootLayout = () => {

  const { successfulLogin } = useContext(UserContext);

  return (
    <>
      <Header />
      {
        successfulLogin
        ? <Outlet/>
        : <Login />
      }
      <Footer />
    </>
  )
}

export default RootLayout;