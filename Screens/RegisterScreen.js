import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import axios from "axios";
import { Formik, useFormik } from "formik";
import Loader from "../Components/Loader";
import { MyIp } from "../constants";
import { StackActions, useNavigation } from "@react-navigation/native";
const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const register = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      firstName: yup
        .string()
        .min(4, "Must be 4 characters or more")
        .required("Required"),
      lastName: yup
        .string()
        .min(4, "Must be 4 characters or more")
        .required("Required"),
      email: yup.string().email("Invalid email address").required("Required"),
      password: yup
        .string()
        .min(8, "Password cannot be less than 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      axios.post(`${MyIp}/api/v1/users/register`, values).then((res) => {
        console.log(res);
        setLoading(false), navigation.navigate("Login");
      });
    },
  });
  const navigation = useNavigation();
  return (
    <View
      style={{ flex: 1, backgroundColor: "#555", justifyContent: "center" }}
    >
      {/* /////////////// */}
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
      {/* //////////////////// */}
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              cursorColor={"#ff5733"}
              style={styles.inputStyle}
              onChangeText={register.handleChange("firstName")}
              underlineColorAndroid="#f000"
              placeholder="Enter firstName"
              placeholderTextColor="#ff5733bb"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.errorTextStyle}>{register.errors.firstName}</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              cursorColor={"#ff5733"}
              style={styles.inputStyle}
              onChangeText={register.handleChange("lastName")}
              underlineColorAndroid="#f000"
              placeholder="Enter lastName"
              placeholderTextColor="#ff5733bb"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.errorTextStyle}>{register.errors.lastName}</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              cursorColor={"#ff5733"}
              style={styles.inputStyle}
              onChangeText={register.handleChange("email")}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#ff5733bb"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.errorTextStyle}>{register.errors.email}</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              cursorColor={"#ff5733"}
              style={styles.inputStyle}
              onChangeText={register.handleChange("password")}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#ff5733bb"
              secureTextEntry={true}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.errorTextStyle}>{register.errors.password}</Text>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={register.handleSubmit}
          >
            <Text style={styles.buttonTextStyle}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.registerTextStyle}>
            Go Back ?
            <Text
              style={styles.register}
              onPress={() => navigation.dispatch(StackActions.pop())}
            >
              Log In
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginVertical: 20,
    marginHorizontal: 35,
    margin: 10,
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
    fontSize: 16,
  },
  inputStyle: {
    height: 55,
    flex: 1,
    color: "#222",
    backgroundColor: "#aaaaaadd",
    paddingHorizontal: 15,
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: "#222",
  },
  errorTextStyle: {
    color: "#ff5733",
    textAlign: "left",
    fontSize: 14,
    marginHorizontal: "10%",
    marginVertical: 1,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  register: {
    color: "#FF5733",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
});
