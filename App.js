import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab from "./Screens/Tab";
import Cart from "./Screens/Cart";
import DrawerEcom from "./Screens/DrawerEcom";

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
