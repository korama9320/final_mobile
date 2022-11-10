import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab from "./Screens/Tab";
import Cart from "./Screens/Cart";
import DrawerEcom from "./Screens/DrawerEcom";
import { store } from "./Redux/store";
import { Provider, useSelector } from "react-redux";
import Calculate from "./Screens/Calculation";
import ExercDetails from "./Screens/ExercDetails";
import DietDetails from "./Screens/DiteDetails";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegisterScreen";
import Splash from "./Screens/SplashScreen";
import { useEffect } from "react";
import axios from "axios";
import { MyIp } from "./constants";
import Premium from "./Screens/premium";
import Standard from "./Screens/standard";
import Basic from "./Screens/basic";
export default function App() {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: "#ff5733",
      background: "#ddd",
      card: "#222",
      text: "#ff5733",
      border: "#000",
      notification: "rgb(255, 69, 58)",
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Tab}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
          <Stack.Screen name="Filter" component={DrawerEcom}></Stack.Screen>
          <Stack.Screen name="Calculated" component={Calculate}></Stack.Screen>
          <Stack.Screen
            name="Exe-Details"
            component={ExercDetails}
          ></Stack.Screen>
          <Stack.Screen
            name="Diet-Details"
            component={DietDetails}
          ></Stack.Screen>
          <Stack.Screen name="Premium" component={Premium}></Stack.Screen>
          <Stack.Screen name="Standard" component={Standard}></Stack.Screen>
          <Stack.Screen name="Basic" component={Basic}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
