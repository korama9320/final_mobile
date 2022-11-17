import { Button, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabUser from "./TabUser";
import Home from "./Home";
import Ecom from "./Ecom";
import Profile from "./profile";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, withBadge } from "@rneui/themed";
import { color } from "react-native-reanimated";
import { useSelector } from "react-redux";
import Stats from "./Stats";

function Tab() {
  let cartt = useSelector((state) => state.cartReducer.cart);
  let x = 0;
  for (let i of cartt) {
    x += i.count;
  }
  const BadgedIcon = withBadge(x)(Icon);

  const Tab = createBottomTabNavigator();
  /////////////////////////////tab theme////////////////////////
  const TabTheme = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "GMS") {
        iconName = "home";
        size = focused ? 30 : 20;
      } else if (route.name === "Status") {
        iconName = "stats-chart";
        size = focused ? 30 : 20;
        return <Ionicons name={iconName} size={size} color={color} />;
      } else if (route.name === "Store") {
        iconName = "shop";
        size = focused ? 30 : 20;
      } else if (route.name === "Profile") {
        iconName = "user";
        size = focused ? 30 : 20;
      }
      return <Entypo name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#FF5733",
    tabBarInactiveTintColor: "gray",
  });
  const navigation = useNavigation();

  return (
    <Tab.Navigator screenOptions={TabTheme} initialRouteName="GMS">
      <Tab.Screen
        name="GMS"
        component={TabUser}
        options={{ headerBackVisible: false, headerShown: false }}
      ></Tab.Screen>

      <Tab.Screen
        name="Status"
        component={Stats}
        options={{ headerBackVisible: false, headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen
        name="Store"
        component={Ecom}
        options={{
          headerRight: () => (
            <Text
              onPress={() => {
                navigation.navigate("Cart");
              }}
              style={{ marginRight: 20 }}
            >
              <BadgedIcon
                type="entypo"
                name="shopping-basket"
                color="#ff5733"
                size={30}
                containerStyle={{ left: -5 }}
              />
            </Text>
          ),
          headerLeft: () => (
            <Text
              onPress={() => {
                navigation.navigate("Filter");
              }}
              style={{ marginLeft: 20 }}
            >
              <Feather name={"filter"} size={25} color={"#ff5733"} />
            </Text>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerBackVisible: false, headerShown: false }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Tab;
