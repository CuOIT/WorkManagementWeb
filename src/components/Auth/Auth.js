import React, { useState } from "react";
import { useEffect } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
// import { fetchInstant } from "@/config";
// import { METHOD } from "@/constants";
import "./Auth.css";
const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const handleTabChange = (event) => {
    setActiveTab(event.target.id);
  };
  
  useEffect(() => {
    const loginText = document.querySelector(".title.login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector(".slide.login");
    const signupBtn = document.querySelector(".slide.signup");
    const signupLink = document.querySelector("form .signup-link a");
    signupBtn.onclick = () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
     
    };
    loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    };
    signupLink.onclick = () => {
      signupBtn.click();
      return false;
    };
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    const { phone, password } = event.target;
    const payload = {
      phone: phone.value,
      user_password: password.value,
      // role,
    };
    fetchInstant("/api/login", METHOD.POST, payload).then((res) => {          
      if (res.code===0){
      } else {}                    
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const { phone, password, confirmPassword, name, email, birthday } =
      event.target;
    const payload = {
      phone: phone.value,
      user_password: password.value,
      role: 3,
      user_name: name.value,
      email: email.value,
      birthday: birthday.value,
    };
    fetchInstant("/api/create-new-user", METHOD.POST, payload).then((res) => {
      console.log(res.message);
      if (res.code===0){
      } else {}  
    });
  };
  return (
    
    <div className="login-dad">
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">Login Form</div>
          <div className="title signup">Signup Form</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
          <input type="radio" id="login" name="slide" checked={activeTab === "login"}  onChange={handleTabChange}/>
            <input type="radio" id="signup" name="slide" checked={activeTab === "signup"}  onChange={handleTabChange}/>
            <label htmlFor="login" className="slide login">
              Login
            </label>
              <label htmlFor="signup" className="slide signup">
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form className="login" onSubmit={handleLogin} >
              <div className="field">
                <input
                  name="phone"
                  id="usernameSignIn"
                  type="text"
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="field">
                <input
                  name="password"
                  id="passwordSignIn"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input id="loginBtn" type="submit" value="Log In" />
              </div>
              <div className="signup-link">
                Not a member? <a href="">Signup now</a>
              </div>
            </form>
            <form className="signup" onSubmit={handleSignUp}>
              <div className="field">
                <input id="phone" type="text" placeholder="Phone" required />
              </div>
              <div className="field">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="field">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className="field">
                <input id="name" type="text" placeholder="Name" required />
              </div>
              <div className="field">
                <input id="email" type="text" placeholder="Email" required />
              </div>
              <div className="field"> 
               
               <form>
                
               </form>
                </div>             
              <div className="field">
                <input
                  id="birthday"
                  type="date"
                  placeholder="Birthday"
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
              <div>
      
    </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default main
