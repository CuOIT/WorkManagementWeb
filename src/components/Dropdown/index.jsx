import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset_todoList } from "../../redux/reducer/todolistReducer";

const Dropdown = ({ onClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOptionClick = (option) => {
        // Handle option click logic here

        switch (option) {
            case "profile":
                navigate("/profile");
                break;
            case "changePassword":
                break;
            case "logout":
                localStorage.setItem("user", null);

                navigate("/");
                break;
        }
        onClick();
    };

    return (
        <div className="dropdown_container">
            <ul className="dropdown-list">
                <li>
                    <button className="btn-option" onClick={() => handleOptionClick("profile")}>
                        <p>Profile</p>
                    </button>
                </li>
                <li>
                    <button className="btn-option" onClick={() => handleOptionClick("changePassword")}>
                        <p>Change Password</p>
                    </button>
                </li>
                <li>
                    <button className="btn-option" onClick={() => handleOptionClick("logout")}>
                        <p>Logout</p>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Dropdown;
