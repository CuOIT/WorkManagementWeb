import "./index.css";
import React, { useState, useEffect } from "react";
import { axiosData } from "../../services/axiosInstance";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "../../redux/reducer/userReducer";
const Notification = () => {
    const accessToken = useSelector(selectAccessToken);
    const userRedux = useSelector(selectUserData);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosData(accessToken).get(`http://localhost:8080/api/project/invite?receiver_id=${userRedux.user_id}`);
                const invitations = response.data.data;
                setInvite(invitations);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const [invite, setInvite] = useState([]);
    const handleAccept = async (index) => {
        try {
            await axiosData(accessToken).put(`http://localhost:8080/api/project/response-invitation/${index}`, {
                response: "true",
            });
        } catch (e) {
            console.error(e);
        }
        const fetchData = async () => {
            try {
                const response = await axiosData(accessToken).get(`http://localhost:8080/api/project/invite?receiver_id=${userRedux.user_id}`);

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
            await axiosData(accessToken).put(`http://localhost:8080/api/project/response-invitation/${index}`, {
                response: false,
            });
        } catch (e) {
            console.error(e);
        }
        const fetchData = async () => {
            try {
                const response = await axiosData(accessToken).get(`http://localhost:8080/api/project/invite?receiver_id=${userRedux.user_id}`);
                const dataArray = response.data.data;
                console.log({ dataArray });
                setInvite(dataArray);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    };
    return <div className="notication-container"></div>;
};
export default Notification;
