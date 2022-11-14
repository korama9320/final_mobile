import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Loader from "../Components/Loader";
import { MyIp } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setuser } from "../Redux/Actions/userAction";
import { setcart } from "../Redux/Actions/productsAction";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
      password: yup
        .string()
        .min(8, "Password cannot be less than 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${MyIp}/api/v1/users/login`, values)
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (res.status === 200) {
            AsyncStorage.setItem("token", res.headers.authorization);
            AsyncStorage.setItem("gemail", res.data.email);
            console.log(res.data);
            dispatch(setuser(res.data));
            dispatch(setcart(res.data.cart));

            navigation.reset({ index: 0, routes: [{ name: "Home" }] });
          } else {
            console.log("Please check your email id or password");
          }
        })
        .catch(setLoading(false));
    },
  });
  const navigation = useNavigation();

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
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
          source={require("../assets/login.jpg")}
          style={{
            position: "absolute",

            flex: 1,
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            zIndex: -1,
          }}
        />

        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/icon.png")}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
              <Text style={{ color: "#ff5733", fontSize: 30, marginTop: -40 }}>
                GMS.
              </Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                cursorColor={"#ff5733"}
                style={styles.inputStyle}
                onChangeText={login.handleChange("email")}
                placeholder="Enter Email"
                placeholderTextColor="#ff5733"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <Text style={styles.errorTextStyle}>{login.errors.email}</Text>
            <View style={styles.SectionStyle}>
              <TextInput
                cursorColor={"#ff5733"}
                style={styles.inputStyle}
                onChangeText={login.handleChange("password")}
                placeholder="Enter Password"
                placeholderTextColor="#ff5733"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <Text style={styles.errorTextStyle}>{login.errors.password}</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={login.handleSubmit}
            >
              <Text style={styles.buttonTextStyle}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.registerTextStyle}>
              New Here ?
              <Text
                style={styles.register}
                onPress={() => navigation.navigate("Register")}
              >
                Register
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  mainBody: {
    backgroundColor: "#555",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    zIndex: 2,
  },
  buttonStyle: {
    backgroundColor: "#222",
    borderWidth: 0,
    color: "#FF5733",
    borderColor: "#FF5733",
    height: 60,
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 35,
    borderWidth: 2,
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  },
  buttonTextStyle: {
    color: "#FF5733",
    paddingVertical: 10,
    fontSize: 25,
  },
  inputStyle: {
    height: 55,
    flex: 1,
    color: "#222",
    backgroundColor: "#aaaaaadd",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: "#222",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "#ff5733",
    textAlign: "left",
    fontSize: 14,
    marginHorizontal: "10%",
    marginVertical: 3,
  },
  register: {
    color: "#FF5733",
  },
});
