import React, { useState, useEffect } from "react";
import "./index.css";
import { axiosData } from "../../services/axiosInstance";
import { FiKey } from "react-icons/fi";
import { useSelector } from "react-redux";

const Invite = ({ onCancel, prj_id }) => {
    const [value, setValue] = useState("");
    const [member, setMember] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [targetID, setID] = useState("");
    const [user, setUser] = useState(null);
    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        try {
            const response = await axiosData.get(`/api/project/get-member?project_id=${prj_id}`);
            const listMember = response.data.data;
            listMember.sort((a, b) => a.role.localeCompare(b.role));
            setMember(response.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [role, setRole] = useState("");

    useEffect(() => {
        member.forEach((item) => {
            console.log(user, item);
            if (user.user_id === item.member_id) {
                setRole(item.role);
            }
        });
    }, [member]);

    const date = new Date();
    const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axiosData.post("/api/project/invite", {
            inviter: user.user_id,
            receiver: targetID,
            project_id: prj_id,
            created_at: formattedDate,
        });
        setValue("");
    };

    const fetchSearch = async (user_name) => {
        const response = await axiosData.get(`/api/user/find-user-by-user-name?user_name=${user_name}`);
        const list = response.data.data;
        const filteredList = list.filter((item) => {
            return !member.some((memberItem) => memberItem.user_name === item.user_name);
        });
        setSearchList(filteredList);
    };

    const handleLeave = async (index) => {
        await axiosData.delete("/api/project/leave-project", {
            project_id: prj_id,
            member_id: index,
        });
        const fetchData = async () => {
            try {
                const response = await axiosData.get(`/api/project/get-member?project_id=${prj_id}`);
                const listMember = response.data.data;
                listMember.sort((a, b) => a.role.localeCompare(b.role));
                setMember(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    };

    const handleDelete = async (index) => {
        await axiosData.delete(`/api/project/delete-member?project_id=${prj_id}&member_id=${index}`);
        const fetchData = async () => {
            try {
                const response = await axiosData.get(`/api/project/get-member?project_id=${prj_id}`);
                const listMember = response.data.data;
                listMember.sort((a, b) => a.role.localeCompare(b.role));
                setMember(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    };

    const handleFranchise = async (index) => {
        console.log(index);
        await axiosData.put("/api/project/authorize", {
            admin_id: user.user_id,
            member_id: index,
            project_id: prj_id,
        });
        const fetchData = async () => {
            try {
                const response = await axiosData.get(`/api/project/get-member?project_id=${prj_id}`);
                const listMember = response.data.data;
                listMember.sort((a, b) => a.role.localeCompare(b.role));
                setMember(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    };

    const handleCancel = () => {
        if (typeof onCancel === "function") {
            onCancel();
        }
    };

    return (
        <div className="form_invite">
            <div className="header_invite">
                <h3>Share Projects</h3>
                <button type="button" onClick={handleCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                        <path
                            fill="currentColor"
                            d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                        ></path>
                    </svg>
                </button>
            </div>

            {role === "admin" ? (
                <div className="body">
                    <h4>Invite People</h4>
                    <div className="action">
                        <input
                            type="text"
                            placeholder="Name or Email"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                if (e.target.value != "") {
                                    fetchSearch(e.target.value);
                                } else {
                                    setSearchList([]);
                                }
                            }}
                        />
                        <button type="submit" onClick={handleSubmit}>
                            <span>Invite</span>
                        </button>
                    </div>
                    <ul className="list_search">
                        {searchList?.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setValue(item.user_name);
                                        setID(item.user_id);
                                        setSearchList([]);
                                    }}
                                >
                                    <div className="searchName">
                                        <p>{item.user_name}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="list_partner">
                        {member?.map((item, index) => {
                            console.log(item);
                            return (
                                <li key={index} className="partner">
                                    <div className="avatar">
                                        <p>{item.user_name.slice(0, 1)}</p>
                                    </div>

                                    <div className="field_infor">
                                        <div className="Name">
                                            {item.user_name}
                                            {item.user_name === user.user_name && <div>(Me)</div>}
                                        </div>
                                        <div className="mail">{item.role}</div>
                                    </div>

                                    {item.role === "admin" ? (
                                        item.user_name === user.user_name && (
                                            <button className="action_project leave_project" onClick={() => handleLeave(item.member_id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                                    <g fill="none" fillRule="evenodd">
                                                        <path
                                                            stroke="currentColor"
                                                            d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"
                                                        ></path>
                                                        <path
                                                            fill="currentColor"
                                                            d="M12.8 11l-2.15-2.15a.5.5 0 11.7-.7L14 10.79a1 1 0 010 1.42l-2.65 2.64a.5.5 0 01-.7-.7L12.79 12H4.5a.5.5 0 010-1h8.3z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </button>
                                        )
                                    ) : (
                                        <>
                                            <button className="action_project delete_partner" onClick={() => handleDelete(item.member_id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                                                    <g fill="none" fillRule="evenodd">
                                                        <path d="M0 0h24v24H0z"></path>
                                                        <rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect>
                                                        <path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path>
                                                        <path
                                                            stroke="currentColor"
                                                            d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </button>

                                            <button className="action_project franchise" onClick={() => handleFranchise(item.member_id)}>
                                                <div>
                                                    <FiKey className="franchise_icon" />
                                                </div>
                                            </button>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p className="no-right">Bạn không đủ thẩm quyền để mời người khác tham dự vào Project</p>
            )}
        </div>
    );
};

export default Invite;
