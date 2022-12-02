import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Ionicons from "react-native-vector-icons/Ionicons";
import Page1 from './page1';
import Page2 from './page2';
import { Provider } from 'react-redux'
import store from "./store/index"

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Count") {
                  iconName = "caret-back"
                } else if (route.name === "Count2") {
                  iconName = "caret-forward"
                }

                // You can return any component that you like here!
                return (<Ionicons name={iconName} size={size} color={color} />)
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Count" component={Page1} />
            <Tab.Screen name="Count2" component={Page2} />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
