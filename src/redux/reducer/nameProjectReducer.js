import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameProject: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateNameProject(state, action) {
      state.nameProject = action.payload;
    },
  },
});
const selectNameProject = (state) => state.nameProject.nameProject;
export const { updateNameProject } = nameSlice.actions;
export default nameSlice.reducer;
export {selectNameProject}