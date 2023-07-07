import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";

import "./index.css";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "../../redux/reducer/userReducer";
import Notification from "../Notification";

const Navbar = () => {
    const SHOW_NOTIFICATION = 1;
    const SHOW_DROPDOWN = 2;
    const [show, setShow] = useState(0);
    const userRedux = useSelector(selectUserData);
    const accessToken = useSelector(selectAccessToken);

    const handleShow = (type) => {
        console.log(type);
        if (show != type) {
            setShow(type);
        } else {
            setShow(0);
        }
    };
    const toggleSideBar = () => {
        const sidebar = document.querySelector(".sidebar_container");
        sidebar.classList.toggle("sidebar_hidden");
    };

    return (
        <div id="navbar_container">
            <div className="navbar_left">
                <div className="navbar_item" onClick={toggleSideBar}>
                    <AiOutlineMenu className="ai_icon" />
                </div>
                <div className="navbar_item">
                    <AiFillHome className="ai_icon" />
                </div>
            </div>

            <div className="navbar_right">
                <div className="navbar_item" onClick={() => handleShow(SHOW_NOTIFICATION)}>
                    <AiFillBell className="ai_icon" />
                    {show === SHOW_NOTIFICATION ? <Notification /> : null}
                </div>
                <div className="navbar_item">
                    {accessToken ? (
                        <>
                            <div className="avatar-dropdown" onClick={() => handleShow(SHOW_DROPDOWN)}>
                                <div className="avatarhere">{userRedux.user_name.slice(0, 1)}</div>
                            </div>
                            {show === SHOW_DROPDOWN ? <Dropdown /> : null}
                        </>
                    ) : (
                        <Link to="/login">
                            <button id="button-login">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
