import {
  setListSach,
  addSach as addSachAction,
  deleteSach as deleteSachAction,
  updateSach as updateSachAction,
} from "./Reducer";

const api_url = "http://10.24.27.254:3000/DanhSachSach";
// Thunk Actions
export const fetchSach = () => {
  return async (dispatch) => {
    try {
      console.log("Đang fetch dữ liệu từ:", api_url);
      const res = await fetch(api_url);
      const data = await res.json();
      console.log("Raw data từ API:", data);
      
      // Kiểm tra và xử lý dữ liệu
      const sachList = Array.isArray(data) ? data : data.DanhSachSach || [];
      console.log("Dữ liệu sách đã xử lý:", sachList);
      
      dispatch(setListSach(sachList));
    } catch (error) {
      console.error("Lỗi lấy danh sách sách:", error);
    }
  };
};

export const addSachAsync = (sach) => {
  return async (dispatch) => {
    try {
      const res = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sach),
      });
      const data = await res.json();
      console.log("Thêm sách thành công:", data);
      dispatch(addSachAction(data));
      dispatch(fetchSach()); // Refresh danh sách sau khi thêm
    } catch (error) {
      console.error("Lỗi thêm sách:", error);
    }
  };
};

export const deleteSachAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${api_url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Xóa sách thành công:", id);
        dispatch(deleteSachAction({ id }));
        dispatch(fetchSach()); // Refresh danh sách sau khi xóa
      } else {
        console.error("Lỗi xóa sách:", res.statusText);
      }
    } catch (error) {
      console.error("Lỗi xóa sách:", error);
    }
  };
};

export const updateSachAsync = (sach) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${api_url}/${sach.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sach),
      });
      const data = await res.json();
      console.log("Cập nhật sách thành công:", data);
      dispatch(updateSachAction(data));
      dispatch(fetchSach()); // Refresh danh sách sau khi cập nhật
    } catch (error) {
      console.error("Lỗi cập nhật sách:", error);
    }
  };
};

// Action Types
export const ADD_SACH = 'ADD_SACH';
export const DELETE_SACH = 'DELETE_SACH';
export const UPDATE_SACH = 'UPDATE_SACH';

// Action Creators
export const addSach = (sach) => ({
  type: ADD_SACH,
  payload: sach,
});

export const deleteSach = (id) => ({
  type: DELETE_SACH,
  payload: id,
});

export const updateSach = (sach) => ({
  type: UPDATE_SACH,
  payload: sach,
});
