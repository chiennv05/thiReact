import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import sachReducer from './redux/Reducer';

import ListSach from './screens/ListSach';
import AddSach from './screens/AddSach';
import EditSach from './screens/EditSach';

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: sachReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListSach">
          <Stack.Screen 
            name="ListSach" 
            component={ListSach} 
            options={{ title: 'Danh Sách Sách' }}
          />
          <Stack.Screen 
            name="AddSach" 
            component={AddSach} 
            options={{ title: 'Thêm Sách Mới' }}
          />
          <Stack.Screen 
            name="EditSach" 
            component={EditSach} 
            options={{ title: 'Chỉnh Sửa Sách' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
