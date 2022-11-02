import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab from "./Screens/Tab";
import Cart from "./Screens/Cart";
import DrawerEcom from "./Screens/DrawerEcom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

export default function App() {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: "#ff5733",
      background: "#999",
      card: "#222",
      text: "#ff5733",
      border: "#000",
      notification: "rgb(255, 69, 58)",
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tab}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
          <Stack.Screen name="Filter" component={DrawerEcom}></Stack.Screen>
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
