import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./../../redux/reducer/userReducer";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import axios from "axios";
import { axiosAuth, axiosData } from "./../../services/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import "./Auth.css";
const LoginForm = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();
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
        const { email, password } = event.target;
        const payload = {
            email: email.value,
            password: password.value,
            // role,
        };
        axiosAuth
            .post("api/user/login", payload, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                const successMessage = res.data.message;
                toast.success(successMessage);
                const payload = {
                    user: res.data.user,
                    accessToken: res.data.accessToken,
                };
                dispatch(login(payload));
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                const errorMessage = error?.response.data.message || "Error occured";
                toast.error(errorMessage);
            });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        const { phone, password, user_name, last_name, first_name, email, birthday } = event.target;
        const payload = {
            phone: phone.value,
            user_password: password.value,
            role: 3,
            user_name: user_name.value,
            last_name: last_name.value,
            first_name: first_name.value,
            email: email.value,
            birthday: birthday.value,
        };
        axiosAuth.post("/api/user/signup", payload).then((res) => {
            console.log(res);
            if (res.code === 0) {
            } else {
            }
        });
    };

    return (
        <div className="login-dad">
            <Toaster />
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login">Login Form</div>
                    <div className="title signup">Signup Form</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" id="login" name="slide" checked={activeTab === "login"} onChange={handleTabChange} />
                        <input type="radio" id="signup" name="slide" checked={activeTab === "signup"} onChange={handleTabChange} />
                        <label htmlFor="login" className="slide login">
                            Login
                        </label>
                        <label htmlFor="signup" className="slide signup">
                            Signup
                        </label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form className="login" onSubmit={handleLogin}>
                            <div className="field">
                                <input name="email" id="usernameSignIn" type="text" placeholder="Email" required />
                            </div>
                            <div className="field">
                                <input name="password" id="passwordSignIn" type="password" placeholder="Password" required />
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
                                <input id="email" type="text" placeholder="Email" required />
                            </div>
                            <div className="field">
                                <input id="password" type="password" placeholder="Password" required />
                            </div>
                            <div className="field">
                                <input id="confirmPassword" type="password" placeholder="Confirm password" required />
                            </div>
                            <div className="field" style={{ whiteSpace: "nowrap" }}>
                                <div
                                    style={{
                                        display: "inline-block",
                                        width: "48%",
                                        height: "100%",
                                        marginRight: "4%",
                                    }}
                                >
                                    <input
                                        // style={{ width: "2450 px" }}
                                        id="last_name"
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "inline-block",
                                        width: "48%",
                                        height: "100%",
                                    }}
                                >
                                    <input id="first_name" type="text" placeholder="First Name" required />
                                </div>
                            </div>
                            <div className="field">
                                <input id="phone" type="text" placeholder="Phone" required />
                            </div>
                            <div className="field">
                                <input id="user_name" type="text" placeholder="User_name" required />
                            </div>
                            <div className="field">
                                <input id="birthday" type="date" placeholder="Birthday" required />
                            </div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup" />
                            </div>
                            <div></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
