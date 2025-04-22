import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateSachAsync } from '../redux/Action';
import * as ImagePicker from 'react-native-image-picker';

const EditSach = ({ route, navigation }) => {
  const { sach } = route.params;
  const dispatch = useDispatch();

  const [tenSach, setTenSach] = useState(sach.ph11341_ten_sach_22042025);
  const [tacGia, setTacGia] = useState(sach.ph11341_tac_gia_22042025);
  const [giaSach, setGiaSach] = useState(sach.ph11341_gia_sach_22042025.toString());
  const [theLoai, setTheLoai] = useState(sach.ph11341_the_loai_22042025);
  const [namPhatHanh, setNamPhatHanh] = useState(sach.ph11341_nam_phat_hanh_22042025.toString());
  const [moTa, setMoTa] = useState(sach.ph11341_mo_ta_22042025);
  const [anhBia, setAnhBia] = useState(sach.ph11341_anh_bia_22042025);
  const [previewImage, setPreviewImage] = useState(sach.ph11341_anh_bia_22042025);

  const handleChoosePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    try {
      const result = await ImagePicker.launchImageLibrary(options);
      
      if (result.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Lỗi', 'Không thể chọn ảnh, vui lòng thử lại');
      } else if (result.assets && result.assets.length > 0) {
        const source = result.assets[0].uri;
        setAnhBia(source);
        setPreviewImage(source);
      }
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi chọn ảnh');
    }
  };

  const handleUpdateSach = () => {
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

    const updatedSach = {
      id: sach.id,
      ph11341_ten_sach_22042025: tenSach,
      ph11341_tac_gia_22042025: tacGia,
      ph11341_gia_sach_22042025: giaSachValue,
      ph11341_the_loai_22042025: theLoai,
      ph11341_nam_phat_hanh_22042025: namValue,
      ph11341_mo_ta_22042025: moTa,
      ph11341_anh_bia_22042025: anhBia,
    };

    dispatch(updateSachAsync(updatedSach));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh Sửa Sách</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
        {previewImage ? (
          <Image source={{ uri: previewImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Chọn ảnh bìa</Text>
          </View>
        )}
      </TouchableOpacity>

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

      <Button title="Cập Nhật Sách" onPress={handleUpdateSach} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
});

export default EditSach; 