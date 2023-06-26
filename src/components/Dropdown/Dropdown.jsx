import React, { useState } from "react";
import "./DropDown.css";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";
const Dropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        <div className="dropdown navbar_item">
            <div className="avatar-dropdown " onClick={toggleDropdown}>
                <RxAvatar className="rxAvatar" />
            </div>

            {isOpen && (
                <div className="dropdown-list-container">
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
                </div>
            )}
        </div>
    );
};

export default Dropdown;