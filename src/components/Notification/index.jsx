import "./index.css";
import React, { useState, useEffect } from "react";
import { axiosData } from "../../services/axiosInstance";
const Notification = () => {
    const [user, setUser] = useState(null);
    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        try {
            const response = await axiosData.get(`/api/project/invite?receiver_id=${user.user_id}`);
            const invitations = response.data.data;
            setInvite(invitations);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [invite, setInvite] = useState([]);
    const handleAccept = async (index) => {
        try {
            await axiosData.put(`/api/project/response-invitation/${index}`, {
                response: "true",
            });
        } catch (e) {
            console.error(e);
        }
        const fetchData = async () => {
            try {
                const response = await axiosData.get(`/api/project/invite?receiver_id=${user.user_id}`);

                const dataArray = response.data.data;
                console.log({ dataArray });
                setInvite(dataArray);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    };

    const handleRefuse = async (index) => {
        try {
            await axiosData.put(`/api/project/response-invitation/${index}`, {
                response: "false",
            });
        } catch (e) {
            console.error(e);
        }
        const fetchData = async () => {
            try {
                const response = await axiosData.get(`/api/project/invite?receiver_id=${user.user_id}`);
                const dataArray = response.data.data;
                console.log({ dataArray });
                setInvite(dataArray);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    };
    return (
        <div className="announce_container">
            <ul className="announce_mam">
                {invite?.map((item, index) => {
                    return (
                        <li key={index} id={item.id}>
                            <div className="avatar">
                                <p>{item.inviter.slice(0, 1)}</p>
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
                {invite.length === 0 && (
                    <div className="no-invite">
                        <p>You don't have any invitation</p>
                    </div>
                )}
            </ul>
        </div>
    );
};
export default Notification;
