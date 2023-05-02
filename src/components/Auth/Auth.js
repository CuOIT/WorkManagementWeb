import React from "react"
import "./Auth.css"
import {fetchInstant} from "./../../config"
import {METHOD} from "./../../constants"
const Login_showing = (event)=>{
  const title = document.querySelectorAll(".title div");
  const form = document.querySelectorAll(".Form4 form");
  title[0].style.display ="block";
  title[1].style.display ="none";
  form[0].style.display = "block";
  form[1].style.display = "none";
}
const Signup_showing = (event)=>{
  event.preventDefault();
  const title = document.querySelectorAll(".title div");
  const form = document.querySelectorAll(".Form4 form");
  title[0].style.display ="none";
  title[1].style.display ="block";
  form[0].style.display = "none";
  form[1].style.display = "block";
}

const Login = (event)=>{
  event.preventDefault();
  const {email, password} = event.target;
  const payload  = {
    email:  email.value,
    password: password.value
  }
  fetchInstant("/user/login",METHOD.POST,payload).then(res=>{
    console.log(res);
    //Xu ly FE o day
  })
  console.log(payload);
}

const Signup = (event)=>{
  event.preventDefault();
  const {email, password, confirm , name, phone, birthday} = event.target;
  const payload = {
    email: email.value,
    password: password.value,
    confirm_password: confirm.value,
    name: name.value,
    phone:  phone.value,
    birthday: birthday.value
  }
  console.log(payload);
  fetchInstant("/user/signup",METHOD.POST,payload).then(res=>{
    console.log(res);
    //Xu ly FE o day
  })
}

const main = () => {
  return (

    <div className="Form">
      <div className="Form1">
      
          <div className="title">
            <div className="title_login">Login Form</div>
            <div className="title_signup">Signup Form</div>
          </div>

          <div className="Form3">
            <div className="slide">
              <label htmlFor="login" className="slide_login" onClick={Login_showing}>
                Login
              </label>
              <label htmlFor="signup" className="slide_signup" onClick={Signup_showing}>
                Signup
              </label>
            </div>

            <div className="Form4">
              <form action="" className="form_login" onSubmit={Login}>
                <div className="field">
                  <input type="text" id="email" placeholder="Email" required />
                </div>
                <div className="field">
                  <input type="password" id="password" placeholder="Password" required />
                </div>
                <div className="forgot_link">
                  <a href="">Forgot password?</a>
                </div>
                <div className="submit">
                  <input type="submit" value = "Log in" id="submit"/>
                </div>
                <div className="signup_link">
                    Not a member?<a href="" onClick={Signup_showing}>&nbsp;Signup now</a>
                </div>
              </form>

              <form action="" className="form_signup" onSubmit={Signup}>
                <div className="field">
                  <input type="text" id="email" placeholder="Email" required/>
                </div>
                <div className="field">
                  <input type="password" id="password" placeholder="Password" required/>
                </div>
                <div className="field">
                  <input type="password" id="confirm" placeholder="Confirm Password" required/>
                </div>
                <div className="field">
                  <input type="text" id="name" placeholder="Name" required/>
                </div>
                <div className="field">
                  <input type="text" id="phone" placeholder="Phone" required/>
                </div>
                <div className="field">
                  <input type="date" id="birthday" required/>
                </div>
                <div className="submit">
                  <input type="submit" value = "Sign up"/>
                </div>
              </form>

            </div>
        </div>  
      </div>
    </div>

  )
}

export default main
