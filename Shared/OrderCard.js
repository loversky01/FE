import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from './StyledComponents/StyledButton';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './StyledComponents/TrafficLight';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const codes = [
  { name: 'pending', code: '3' },
  { name: 'shipped', code: '2' },
  { name: 'delivered', code: '1' },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    if (props.status == '3') {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText('Chưa giải quyết');
      setCardColor('#E74C3C');
    } else if (props.status == '2') {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText('Đang vận chuyển');
      setCardColor('#F1C40F');
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText('Đã giao hàng');
      setCardColor('#2ECC71');
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
      setToken();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Trạng thái đơn hàng đã được cập nhật',
            text2: '',
          });
          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Lỗi',
          text2: 'Vui lòng thử lạir',
        });
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={styles.container}>
        <Text>Order ID: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Trạng thái: {statusText} {orderStatus}
        </Text>
        <Text>
          Địa chỉ: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>Thành phố: {props.city}</Text>
        <Text>Quốc gia: {props.country}</Text>
        <Text>Ngày đặt: {props.dateOrdered.split('T')[0]}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text>Tiền hàng: </Text>
        <Text style={styles.price}> {props.totalPrice} đ</Text>
      </View>
      {props.editMode && (
        <View style={{ flexDirection: 'row', position: 'relative' }}>
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={{ label: 'Thay đổi trạng thái', value: null }}
              onValueChange={(value) => setStatusChange(value)}
              items={[
                { label: 'Đang chờ', value: '3' },
                { label: 'Đang giao', value: '2' },
                { label: 'Đã giao', value: '1' },
              ]}
            />
          </View>
          <View style={{ right: 0, justifyContent: 'center' }}>
            <StyledButton secondary medium onPress={() => updateOrder()}>
              <Text style={{ alignSelf: 'center', color: 'white' }}>
                Cập nhật
              </Text>
            </StyledButton>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    width: '60%',
    margin: 10,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#62b1f6',
  },
});

export default OrderCard;
