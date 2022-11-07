import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "Login" : "Login")
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/banner.jpg")}
        style={{
          position: "absolute",
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          zIndex: -1,
        }}
      />
      <View
        style={{
          position: "absolute",
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "#22222299",
          zIndex: 0,
        }}
      ></View>
      <Image
        source={require("../assets/icon.png")}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <Text style={{ color: "#ff5733", fontSize: 40, marginTop: -40 }}>
        GMS.
      </Text>
      <ActivityIndicator
        animating={animating}
        color="#FF5733"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
