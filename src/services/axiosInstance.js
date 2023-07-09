import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
const instance = () => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL, //process.env.baseURL
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
//
const axiosData = instance();
export { axiosAuth, axiosData };
