import React, { useState } from "react";
import "./DropDown.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserData } from "../../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUserData)

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
                <div className='avatarhere'>
                    <div>
                        <p>{user.user_name.slice(0, 1)}</p>
                    </div>
                </div>
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