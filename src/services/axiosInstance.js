import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
const axiosData = (accessToken) =>
    axios.create({
        baseURL: process.env.REACT_APP_BASE_URL, //process.env.baseURL
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
//
export { axiosAuth, axiosData };
