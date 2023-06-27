import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameWorkspace: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateNameWorkspace(state, action) {
      state.nameWorkspace = action.payload;
    },
  },
});
const selectNameWorkspace = (state) => state.nameWorkspace.nameWorkspace;
export const { updateNameWorkspace } = nameSlice.actions;
export default nameSlice.reducer;
export {selectNameWorkspace}