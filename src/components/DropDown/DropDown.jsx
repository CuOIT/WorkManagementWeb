import React, { useState } from "react";
import "./DropDown.css";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/userReducer";
const Dropdown = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        // Handle option click logic here
        switch (option) {
            case "profile":
                break;
            case "changePassword":
                break;
            case "logout":
                dispatch(logout({}));
                break;
        }
    };

    return (
        <div className="dropdown">
            <div className="avatar-dropdown" onClick={toggleDropdown}>
                <RxAvatar className="rxAvatar" />
            </div>

            {isOpen && (
                <div className="dropdown-list-container">
                    <ul className="dropdown-list">
                        <li onClick={() => handleOptionClick("profile")}>Profile</li>
                        <li onClick={() => handleOptionClick("changePassword")}>Change Password</li>
                        <li onClick={() => handleOptionClick("logout")}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
