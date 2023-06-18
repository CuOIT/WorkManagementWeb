import jwt_decode from "jwt-decode";

const verifyExpiredToken = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken);
        const exp = decodedToken.exp;
        const now = Math.floor(Date.now() / 1000);
        console.log({
            exp,
            now,
        });
        if (exp < now) return false;
        return true;
    } catch (error) {
        console.log({ error });
        return false;
    }
};

export { verifyExpiredToken };
