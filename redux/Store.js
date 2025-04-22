import { configureStore } from "@reduxjs/toolkit";

import sinhVienReducer from "./Reducer"; // Import reducer từ file Reducer.tsx

export const store = configureStore({
  reducer: {
    listSinhVien: sinhVienReducer, // Đặt tên cho reducer là "xe"
  },
});
