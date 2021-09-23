import React, { useContext,useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import style from "./App.module.css";
import LoginForm from "./components/Forms/Login/Login";
import SignUpForm from "./components/Forms/SignUp/SignUp";
import NewArticle from "./components/Forms/NewArticle/NewArticle";
import NewComment from "./components/Forms/NewComment/NewComment";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
import EditProfile from "./components/Forms/EditProfile/EditProfile";
import {Authorization} from './context'
import HomePage from './components/Pages/HomePage/HomePage';
import EditArticle from'./components/Forms/EditArticle/EditArticle'
import { useApiUser } from './Api/useApiUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';



function App() {

  const {isLoggedIn,logIn,getUser,token}=useContext(Authorization)
  const {initGetCurrentUser,userRequestState} = useApiUser()

  useEffect(()=>{
     if(token){
      initGetCurrentUser()
      .then((data)=>{
      if(data==='error')
        return false
      getUser(data)
       logIn()
    })
    }
  },[])

  return (
    <BrowserRouter>
      {!isLoggedIn? <Redirect to="/" />: true}
      <div className={style.app}>
        <Header userRequestState={userRequestState}  />
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}/>
        <Route  path="/editarticle">
        <EditArticle />
        </Route>
        <Route  path="/userprofile">
        <UserProfile />
        </Route>
        <Route  path="/editprofile">
        <EditProfile />
        </Route>
        <Route  path="/newcomment">
        <NewComment />
        </Route>
        <Route  path="/newarticle">
        <NewArticle />
        </Route>
        <Route exact path="/loginform">
          {isLoggedIn ? <Redirect to="/" /> : <LoginForm />}
        </Route>
        <Route exact path="/signupform">
          {isLoggedIn ? <Redirect to="/" /> :  <SignUpForm/>}
        </Route>
        <Route exact path="/">
          <HomePage isLoggedIn={isLoggedIn}/>
        </Route>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
