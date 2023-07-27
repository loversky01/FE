# FE-RNShopping
"Sử dụng React Native cho FE"
"Sửa file theo đường dẫn FE\assets\common\baseUrl.js để sử dụng ngrok  "

"import { Platform } from 'react-native';
let baseURL;
if (Platform.OS === 'android') {
 baseURL = 'https://7ed2-222-252-29-229.ngrok-free.app/api/v1/';
} else if (Platform.OS === 'ios') {
 baseURL = 'https://7ed2-222-252-29-229.ngrok-free.app/api/v1/';
}
export default baseURL;"

"Để sử dụng ngrok tải trên trang chủ bật cmd lên gõ 'ngrok http 3000'"

"Cổng 3000 chính là cổng server chạy cơ sở dữ liệu monogodb"
"Link Code Server: 'https://github.com/loversky01/BE-RNShopping'"
"Lưu ý npm start ở server trước để nhận cổng 3000 sau đó chạy cmd ngrok http 3000 để forward"

"Chạy chương trình thông qua 'expo start' trong cmd"

"npm i" - "để cài các gói cần thiết"
"expo start dùng iphone android để quét QR"
