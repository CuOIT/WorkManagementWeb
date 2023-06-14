import axios from "axios";

const axiosAuth = axios.create({
    baseURL: "http://localhost:8080",
});
const axiosData = (accessToken) =>
    axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

export { axiosAuth, axiosData };
