import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortTo: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateSortTo(state, action) {
      state.sortTo = action.payload;
    },
  },
});
const selectSortTo = (state) => state.sortTo.sortTo;
export const { updateSortTo } = nameSlice.actions;
export default nameSlice.reducer;
export {selectSortTo}