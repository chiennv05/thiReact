import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addSachAsync } from "../redux/Action";

const AddSach = ({ navigation }) => {
  const dispatch = useDispatch();
  const [tenSach, setTenSach] = useState("");
  const [tacGia, setTacGia] = useState("");
  const [giaSach, setGiaSach] = useState("");
  const [theLoai, setTheLoai] = useState("");
  const [namPhatHanh, setNamPhatHanh] = useState("");
  const [moTa, setMoTa] = useState("");
  const [anhBia, setAnhBia] = useState("");

  const handleAddSach = () => {
    // Kiểm tra giá sách
    const giaSachValue = giaSach ? parseFloat(giaSach) : null;
    if (giaSach === "" || isNaN(giaSachValue)) {
      Alert.alert("Lỗi", "Vui lòng nhập giá sách hợp lệ");
      return;
    }

    // Kiểm tra năm phát hành
    const namValue = namPhatHanh ? parseInt(namPhatHanh) : null;
    if (namPhatHanh === "" || isNaN(namValue)) {
      Alert.alert("Lỗi", "Vui lòng nhập năm phát hành hợp lệ");
      return;
    }

    const newSach = {
      ph11341_ten_sach_22042025: tenSach || "",
      ph11341_tac_gia_22042025: tacGia || "",
      ph11341_gia_sach_22042025: giaSachValue,
      ph11341_the_loai_22042025: theLoai || "",
      ph11341_nam_phat_hanh_22042025: namValue,
      ph11341_mo_ta_22042025: moTa || "",
      ph11341_anh_bia_22042025: anhBia || "",
    };

    dispatch(addSachAsync(newSach));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Sách Mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sách"
        value={tenSach}
        onChangeText={setTenSach}
      />

      <TextInput
        style={styles.input}
        placeholder="Tác giả"
        value={tacGia}
        onChangeText={setTacGia}
      />

      <TextInput
        style={styles.input}
        placeholder="Giá sách"
        value={giaSach}
        onChangeText={setGiaSach}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Thể loại"
        value={theLoai}
        onChangeText={setTheLoai}
      />

      <TextInput
        style={styles.input}
        placeholder="Năm phát hành"
        value={namPhatHanh}
        onChangeText={setNamPhatHanh}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={moTa}
        onChangeText={setMoTa}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="URL ảnh bìa"
        value={anhBia}
        onChangeText={setAnhBia}
      />

      <Button title="Thêm Sách" onPress={handleAddSach} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
});

export default AddSach;
