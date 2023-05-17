import React from 'react'
import './Auth.css'

var count = 5;
const handle_slide_login = (event)=>{
  event.preventDefault();
  const form_login_element = document.getElementsByClassName("form_login")[0];
  const form_signup_element = document.getElementsByClassName("form_signup")[0];
  const title_login_element = document.getElementsByClassName("title_login")[0];
  const title_signup_element = document.getElementsByClassName("title_signup")[0];
  const slide_control_element = document.getElementsByClassName("slide_control")[0];
  const label_login = slide_control_element.getElementsByTagName("label")[0];
  const label_signup = slide_control_element.getElementsByTagName("label")[1];
  form_login_element.style.display = "block";
  form_signup_element.style.display = "none";
  title_login_element.style.display = "block";
  title_signup_element.style.display = "none";
  label_login.style.backgroundColor = "rgb(190, 176, 44)";
  label_signup.style.backgroundColor = "white";
  label_signup.style.color = "black";
  label_login.style.color = "white";
}
const handle_slide_signup = (event)=>{
  event.preventDefault();
  const form_login_element = document.getElementsByClassName("form_login")[0];
  const form_signup_element = document.getElementsByClassName("form_signup")[0];
  const title_login_element = document.getElementsByClassName("title_login")[0];
  const title_signup_element = document.getElementsByClassName("title_signup")[0];
  const slide_control_element = document.getElementsByClassName("slide_control")[0];
  const label_login = slide_control_element.getElementsByTagName("label")[0];
  const label_signup = slide_control_element.getElementsByTagName("label")[1];
  form_login_element.style.display = "none";
  form_signup_element.style.display = "block";  
  title_login_element.style.display = "none";
  title_signup_element.style.display = "block";
  label_signup.style.backgroundColor = "rgb(190, 176, 44)";
  label_login.style.backgroundColor = "white";
  label_login.style.color = "black";
  label_signup.style.color = "white"
}
const handle_login = (event)=>{
 // event.preventDefault();
  
  const {user_phone,user_password} = event.target;
  const payload  = {
    phone: user_phone.value,
    password: user_password.value
  }
  return true;
}
const handle_signup = (event)=>{
  //event.preventDefault();
  const {user_phone, user_password,user_confirm_password,user_name,user_email,user_birthday} = event.target;
  const payload = {
    phone: user_phone.value,
    password: user_password.value,
    name: user_name.value,
    email: user_email.value,
    birthday: user_birthday.value
  }
  
  return true;
}

const Auth = () => {
  return (
    <div className='Auth'>
      <div className="wrapper">
        
          <div className="title_text">
            <h1 className='title_login'>Login Form</h1>
            <h1 className='title_signup'>SignUp Form</h1>
          </div>
          <div className="form_container">
            <div className="slide_control">
              <input type="radio" id='login' name='slide' />
              <input type="radio" id='signup' name='slide' />
              <label htmlFor="login" className="slide login" onClick={handle_slide_login}>
                Login
              </label>
              <label htmlFor="signup" className='slide signup' onClick={handle_slide_signup}>
                SignUp
              </label>
            </div>
            <div className="form_inner">
            <form action="/trangchu" className='form_login' >
              <div className="field">
                <input type="text" id='user_phone' placeholder='Phone' required />
              </div>
              <div className="field">
                <input type="password" id='user_password' placeholder='Password' required />
              </div>
              <div className="pass_link">
                <a href="/trangchu">Forgot password?</a>
              </div>
              <div className="field_btn">
                
                  <button className='login_btn'>Log In</button>
                  {/* <input type="submit" value = "Log In" id = "Login_btn" /> */}
                
              </div>
              <div className="signup_link">
                <p>Not a member?<a href='facebook.com' onClick={handle_slide_signup}>&nbsp;Signup now</a></p>
              </div>
            </form>
            <form action="/trangchu" className='form_signup' onSubmit={handle_signup}>
              <div className="field">
                <input type="text" id='user_phone' placeholder='Phone' required/>
              </div>
              <div className="field">
                <input type="password" id='user_password' placeholder='Password' required/>
              </div>
              <div className="field">
                <input type="password" id='user_confirm_password' placeholder='Confirm Password' required/>
              </div>
              <div className="field">
                <input type="text" id='user_name' placeholder='Name' required/>
              </div>
              <div className="field">
                <input type="text" id='user_email' placeholder='Email' required/>
              </div>
              <div className="field">
                <input type="date" id='user_birthday' placeholder='Birthday' required/>
              </div>
              <div className="field_btn">
                
                <button type='submit'>Sign Up</button>
              </div>
              
            </form>
            </div>
            
          
        </div>  
         
      </div>
    </div>
  )
}

export default Auth
