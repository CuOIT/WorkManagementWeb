import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./navbar.css";
import logo_todo from "../image/todolist.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAccessToken, selectUserData } from "./../../../redux/reducer/userReducer";
import Dropdown from "../../DropDown/DropDown";

const Navbar = () => {
    const userRedux = useSelector(selectUserData);
    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show);
    };

    const [showing, setShowing] = useState(false);
    const [invite, setInvite] = useState([]);
    const [user, setUser] = useState([]);

    const handleAccept = async (index) => {
        try {
            axios.put(`http://localhost:8080/api/project/response-invitation/${index}`, {
                response: true,
            });
        } catch (e) {
            console.error(e);
        }
        setShowing(!showing);
    };

    const handleRefuse = async (index) => {
        try {
            axios.put(`http://localhost:8080/api/project/response-invitation/${index}`, {
                response: false,
            });
        } catch (e) {
            console.error(e);
        }
        setShowing(!showing);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/project/invite?receiver_id=${userRedux.user_id}`);

                const dataArray = response.data.data;
                console.log({ dataArray });
                setInvite(dataArray);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div id="navbar_container">
            <div className="navbar_left">
                <div className="icon navbar_item">
                    <img src={logo_todo} alt="" />
                </div>
                <div className="home navbar_item">
                    <p>HOME</p>
                </div>
            </div>
            <div className="navbar_middle">
                <div className="search navbar_item">
                    <input name="user_input" type="text" placeholder="Search" />
                </div>
            </div>
            <div className="navbar_right">
                <div className="help navbar_item">
                    <img
                        src="https://thumbs.dreamstime.com/b/question-mark-line-art-help-symbol-flat-style-icon-isolated-white-background-vector-illustration-146871828.jpg"
                        alt=""
                    />
                </div>
                <div className="announce navbar_item" onClick={() => handleClick()}>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/006/086/198/original/notification-icon-for-web-vector.jpg"
                        alt=""
                    />
                    <div className="announce_container" style={{ display: show ? "block" : "none" }}>
                        <ul>
                            {console.log(invite)}
                            {invite?.map((item, index) => {
                                console.log(item);
                                return (
                                    <li key={index} id={item.id}>
                                        <div className="avatar">
                                            <img
                                                src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff"
                                                alt="Pemond"
                                            />
                                        </div>
                                        <div className="content">
                                            <p>
                                                {item.inviter} just send you invite to join {item.project_name}
                                            </p>
                                        </div>
                                        <div className="action">
                                            <button className="accept" onClick={() => handleAccept(item.id)}>
                                                <svg width="24" height="18" aria-checked="false">
                                                    <path
                                                        fill="currentColor"
                                                        d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <button className="refuse" onClick={() => handleRefuse(item.id)}>
                                                <svg viewBox="0 0 24 24" class="icon_close" width="24" height="15">
                                                    <path
                                                        fill="currentColor"
                                                        fill-rule="nonzero"
                                                        d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                {accessToken ? (
                    <Dropdown />
                ) : (
                    <div className="sign_in navbar_item">
                        <Link to="/login">
                            <button>Đăng nhập</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
