// Needed for tsyringe DI container
import 'reflect-metadata';
import 'react-native-gesture-handler';
import './src/di/register';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
