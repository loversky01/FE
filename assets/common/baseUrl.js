import { Platform } from 'react-native';



let baseURL;
if (Platform.OS === 'android') {
 baseURL = 'https://7ed2-222-252-29-229.ngrok-free.app/api/v1/';
} else if (Platform.OS === 'ios') {
 baseURL = 'https://7ed2-222-252-29-229.ngrok-free.app/api/v1/';
}

export default baseURL;