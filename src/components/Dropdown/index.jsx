import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserData } from "../../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        // Handle option click logic here
        console.log({ option });
        switch (option) {
            case "profile":
                break;
            case "changePassword":
                break;
            case "logout":
                dispatch(logout({}));
                navigate("/");
                break;
        }
    };

    return (
        <div className="dropdown_container">
            {isOpen && (
                <ul className="dropdown-list">
                    <li>
                        <button className="btn-option" onClick={() => handleOptionClick("profile")}>
                            Profile
                        </button>
                    </li>
                    <li>
                        <button className="btn-option" onClick={() => handleOptionClick("changePassword")}>
                            Change Password
                        </button>
                    </li>
                    <li>
                        <button className="btn-option" onClick={() => handleOptionClick("logout")}>
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
