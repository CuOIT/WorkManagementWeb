import { createSlice } from "@reduxjs/toolkit";

const initState = {
    userData: null,
    accessToken: "",
};
const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        login(state, action) {
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logout(state, action) {
            state.userData = null;
            state.accessToken = "";
        },
    },
});
const selectUserData = (state) => state.user.userData;
const selectAccessToken = (state) => state.user.accessToken;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export { selectUserData, selectAccessToken };
