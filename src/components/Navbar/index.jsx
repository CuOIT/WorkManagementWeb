import React, { useState } from "react";
import { BrowserRouter as Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

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
        navigate("/")
    }

    return (
        <>
        {show === SHOW_DROPDOWN && <Dropdown />}
        <div id="navbar_container">
            <div className="navbar_left">
                <div className="navbar_item">
                    <AiOutlineMenu className="ai_icon" onClick={toggleSideBar} />
                </div>
                <div className="navbar_item" >
                    <AiFillHome className="ai_icon" onClick={handleHome}/>
                </div>
            </div>

            <div className="navbar_right">
                <div className="navbar_item">
                    <AiFillBell className="ai_icon" onClick={() => handleShow(SHOW_NOTIFICATION)} />
                    {show === SHOW_NOTIFICATION && <Notification /> }
                </div>
                <div className="navbar_item">
                    {accessToken ? (
                        <>
                            <div className="avatar-dropdown" onClick={() => handleShow(SHOW_DROPDOWN)}>
                                <div className="avatarhere">
                                    <p>
                                        {userRedux.user_name.slice(0, 1)}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Navbar;
