--------------課程內套件--------------

--------------課程內套件--------------

--------------非課程內套件--------------
//gps讀取
npm install @react-native-community/geolocation --save
npm install react-native-geolocation-service
//npm install react-native-maps --save-exact
//本地資料存取
//npm install realm --save
//react-native link realm
npm install react-native-fs --save
react-native link react-native-fs
//元件
npm install react-native-side-menu-updated --save
//npm install --save react-native-elements 
npm install --save react-native-fab
npm install  react-native-keyboard-aware-scroll-view --save
// icon
npm install --save react-native-vector-icons
react-native link react-native-vector-icons
--------------非課程內套件--------------


最外層index.js有修改，如下
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
