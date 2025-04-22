import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachSach: [],
  loading: false,
  error: null,
};

const sachSlice = createSlice({
  name: "sach",
  initialState,
  reducers: {
    setListSach: (state, action) => {
      state.danhSachSach = action.payload;
    },
    addSach: (state, action) => {
      state.danhSachSach.push({ ...action.payload, id: Date.now().toString() });
    },
    deleteSach: (state, action) => {
      state.danhSachSach = state.danhSachSach.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateSach: (state, action) => {
      const index = state.danhSachSach.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.danhSachSach[index] = action.payload;
      }
    },
  },
});

export const { setListSach, addSach, deleteSach, updateSach } = sachSlice.actions;
export default sachSlice.reducer;
