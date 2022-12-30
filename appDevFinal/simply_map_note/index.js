import { AppRegistry, LogBox } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
])
AppRegistry.registerComponent(appName, () => App);
