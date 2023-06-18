import axios from "axios";
import { verifyExpiredToken } from "./verifyAccessToken";
import { updateAccessToken } from "../redux/reducer/userReducer";
import { store } from "./../redux/store";
const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});
const axiosData = (accessToken) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL, //process.env.baseURL
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    });
    instance.interceptors.request.use((config) => {
        console.log({ config });
        const accessToken = config.headers.Authorization.split(" ")[1];
        const verified = verifyExpiredToken(accessToken);
        console.log({ verified });
        if (!verified) {
            axiosAuth
                .post("/api/user/refresh-token")
                .then((res) => {
                    console.log(res);
                    const newAccessToken = res.data.accessToken;
                    store.dispatch(updateAccessToken({ accessToken: newAccessToken }));
                })
                .catch((error) => {
                    window.location.href = `http://localhost:3000/login`;
                    console.log({ error });
                });
        }
        return config;
    });
    // instance.interceptors.response.use(
    //     (res) => {
    //         const status = res.status;
    //         console.log(status);
    //         return res;
    //     },
    //     (error) => {
    //         const status = error.response.status;
    //         console.log({ status });
    //         console.log({ error });
    //         return Promise.reject("ERR");
    //     }
    // );
    return instance;
};
//
export { axiosAuth, axiosData };
