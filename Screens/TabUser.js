import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tab from "./Tab";
import Exercise from "./Excer";
import Diet from "./Dite";
import Stats from "./Stats";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";

function TabUser() {
  const TabUser = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  return (
    <TabUser.Navigator initialRouteName="GMS.">
      <TabUser.Screen
        name="GMS."
        component={Home}
        options={{ headerBackVisible: false, headerShown: false }}
      ></TabUser.Screen>

      <TabUser.Screen name="Exercise" component={Exercise}></TabUser.Screen>
      <TabUser.Screen name="Diet" component={Diet}></TabUser.Screen>
    </TabUser.Navigator>
  );
}

export default TabUser;
