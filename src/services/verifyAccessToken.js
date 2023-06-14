import jwt from "jsonwebtoken";

const verifyExpiredToken = (accessToken) => {
    // const decodedToken = jwt.decode(accessToken);
    // console.log(decodedToken);
    return true;
};

export { verifyExpiredToken };
