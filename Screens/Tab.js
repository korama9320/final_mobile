import { Button, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabUser from "./TabUser";
import Home from "./Home";
import Ecom from "./Ecom";
import Profile from "./profile";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, withBadge } from "@rneui/themed";
import { color } from "react-native-reanimated";
import { useSelector } from "react-redux";

function Tab() {
  let cartt = useSelector((state) => state.cartReducer.cart);
  let x = 0;
  for (let i of cartt) {
    x += i.count;
  }
  const BadgedIcon = withBadge(x)(Icon);

  const Tab = createBottomTabNavigator();
  const TabTheme = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "GMS") {
        iconName = "home";
        size = focused ? 30 : 20;
      } else if (route.name === "Plan") {
        iconName = "calendar";
        size = focused ? 30 : 20;
      } else if (route.name === "E-com") {
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
    <Tab.Navigator screenOptions={TabTheme}>
      <Tab.Screen name="GMS" component={Home}></Tab.Screen>
      <Tab.Screen
        name="Plan"
        component={TabUser}
        options={{
          headerBackVisible: false,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="E-com"
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
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Tab;
