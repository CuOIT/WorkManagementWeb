import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./index.css";
import Dropdown from "../Dropdown";
import Notification from "../Notification";

const Navbar = () => {
    const SHOW_NOTIFICATION = 1;
    const SHOW_DROPDOWN = 2;
    const [show, setShow] = useState(0);
    const [login, setLogin] = useState(false);
    const [avatar, setAvatar] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLogin(true);
            const char = user.user_name.slice(0, 1);
            setAvatar(char);
        } else setLogin(false);
    });
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

    const handleHome = () => {
        navigate("/");
    };

    return (
        <>
            {show === SHOW_DROPDOWN && (
                <Dropdown
                    onClick={() => {
                        setShow(false);
                    }}
                />
            )}
            <div id="navbar_container">
                <div className="navbar_left">
                    <div className="navbar_item" onClick={toggleSideBar}>
                        <AiOutlineMenu className="ai_icon" />
                    </div>
                    <div className="navbar_item">
                        <AiFillHome className="ai_icon" onClick={handleHome} />
                    </div>
                </div>
                <div className="navbar_middle">
                    <p className="group9">GROUP 9: TASK MANAGEMENT</p>
                </div>
                <div className="navbar_right">
                    <div className="navbar_item" onClick={() => handleShow(SHOW_NOTIFICATION)}>
                        <AiFillBell className="ai_icon" />
                        {show === SHOW_NOTIFICATION && <Notification />}
                    </div>
                    <div className="navbar_item">
                        {login ? (
                            <>
                                <div className="avatar-dropdown" onClick={() => handleShow(SHOW_DROPDOWN)}>
                                    <div className="avatarhere">{avatar && <p>{avatar}</p>}</div>
                                </div>
                            </>
                        ) : (
                            <Link to="/login">
                                <button id="button-login">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
