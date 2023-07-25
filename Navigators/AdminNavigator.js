import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Orders from '../Screens/Admin/Orders';
import AdCategories from '../Screens/Admin/AdCategories';
import Products from '../Screens/Admin/Products';
import ProductForm from '../Screens/Admin/ProductForm';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Products'
        component={Products}
        options={{
          title: 'Admin - QLSP',
        }}
      />
      <Stack.Screen name='AdCategories' component={AdCategories} options={{
          title: 'Danh mục sản phẩm',
        }} />
      <Stack.Screen name='Orders' component={Orders}options={{
          title: 'Danh sách đơn hàng',
        }} />
      <Stack.Screen name='ProductForm' component={ProductForm} options={{
          title: 'Sản phẩm',
        }} />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}