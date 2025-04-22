import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSachAsync, fetchSach } from '../redux/Action';
import Banner from './Banner';

const ListSach = ({ navigation }) => {
  const danhSachSach = useSelector((state) => state.danhSachSach);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' hoặc 'desc'

  useEffect(() => {
    dispatch(fetchSach());
  }, [dispatch]);

  const handleDeleteSach = (id) => {
    dispatch(deleteSachAsync(id));
  };

  // Lọc sách theo tên
  const filteredBooks = danhSachSach.filter(sach => 
    sach.ph11341_ten_sach_22042025.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sắp xếp sách theo giá
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.ph11341_gia_sach_22042025 - b.ph11341_gia_sach_22042025;
    } else {
      return b.ph11341_gia_sach_22042025 - a.ph11341_gia_sach_22042025;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderItem = (item) => (
    <View key={item.id} style={styles.sachItem}>
      <Image 
        source={{ uri: item.ph11341_anh_bia_22042025 }} 
        style={styles.anhBia}
        defaultSource={require('../assets/images/default-book.png')}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.tenSach}>{item.ph11341_ten_sach_22042025}</Text>
        <Text style={styles.tacGia}>Tác giả: {item.ph11341_tac_gia_22042025}</Text>
        <Text style={styles.giaSach}>Giá: {item.ph11341_gia_sach_22042025.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.theLoai}>Thể loại: {item.ph11341_the_loai_22042025}</Text>
        <Text style={styles.namPhatHanh}>Năm: {item.ph11341_nam_phat_hanh_22042025}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditSach', { sach: item })}
        >
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteSach(item.id)}
        >
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[1]}>
        <Banner />
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sách..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.sortButton}
            onPress={toggleSortOrder}
          >
            <Text style={styles.sortButtonText}>
              Sắp xếp theo giá {sortOrder === 'asc' ? '↑' : '↓'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddSach')}
        >
          <Text style={styles.addButtonText}>Thêm Sách Mới</Text>
        </TouchableOpacity>

        {sortedBooks.map(item => renderItem(item))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sortButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 20,
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sachItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
    flexDirection: 'row',
  },
  anhBia: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  tenSach: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tacGia: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  giaSach: {
    fontSize: 16,
    color: '#e53935',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  theLoai: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  namPhatHanh: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196f3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListSach;