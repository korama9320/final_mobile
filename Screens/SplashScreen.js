import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { MyIp } from "../constants";
import { setuser } from "../Redux/Actions/userAction";
import { useDispatch } from "react-redux";
import { setcart } from "../Redux/Actions/productsAction";
const Splash = () => {
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      let gemail = await AsyncStorage.getItem("gemail");

      AsyncStorage.getItem("token").then((value) => {
        if (value === null) {
          navigation.navigate("Login");
        } else {
          axios
            .post(
              `${MyIp}/api/v1/users/gateway`,
              { email: gemail },
              { headers: { authorization: value } }
            )
            .then((res) => {
              if (res.status === 200) {
                console.log(res.data);
                dispatch(setuser(res.data));
                dispatch(setcart(res.data.cart));
                navigation.navigate("Home");
              } else {
                navigation.navigate("Login");
              }
            })
            .catch(console.log("login"), navigation.navigate("Login"));
        }
      });
    }, 4000);
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
