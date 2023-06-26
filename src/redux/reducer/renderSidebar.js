import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  renderSidebar: false,
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateRenderSidebar(state, action) {
      state.renderSidebar = action.payload;
    },
  },
});
const selectRenderSidebar = (state) => state.renderSidebar.renderSidebar;
export const { updateRenderSidebar } = nameSlice.actions;
export default nameSlice.reducer;
export {selectRenderSidebar}