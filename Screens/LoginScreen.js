// Import React and Component
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
import { Formik, useFormik } from "formik";
import Loader from "../Components/Loader";
import { MyIp } from "../constants";
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  // const passwordInputRef = createRef();

  // const handleSubmitPress = () => {
  // setErrortext("");
  // if (!userEmail) {
  //   alert("Please fill Email");
  //   return;
  // }
  // if (!userPassword) {
  //   alert("Please fill Password");
  //   return;
  // }
  // setLoading(true);
  // let dataToSend = { email: userEmail, password: userPassword };
  // let formBody = [];
  // for (let key in dataToSend) {
  //   let encodedKey = encodeURIComponent(key);
  //   let encodedValue = encodeURIComponent(dataToSend[key]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");

  //   fetch(`${MyIp}api/user/login`, {
  //     method: "POST",
  //     body: formBody,
  //     headers: {
  //       //Header Defination
  //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.log(responseJson);
  //       // If server response message same as Data Matched
  //       if (responseJson.status === "ok") {
  //         AsyncStorage.setItem("user_id", responseJson.data.email);
  //         console.log(responseJson.data.email);
  //         navigation.replace("DrawerNavigationRoutes");
  //       } else {
  //         setErrortext(responseJson.msg);
  //         console.log("Please check your email id or password");
  //       }
  //     })
  //     .catch((error) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };
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
      axios.post(`${MyIp}'/api/v1/users/login`, values).then((res) => {
        setLoading(false);
        if (res.status === "ok") {
          // AsyncStorage.setItem("user_id", res.data.email);
          // console.log(responseJson.data.email);
          // navigation.replace("DrawerNavigationRoutes");
          navigation.navigate("Home");
        } else {
          setErrortext(responseJson.msg);
          console.log("Please check your email id or password");
        }
      });
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
                // onSubmitEditing={() =>
                //   passwordInputRef.current && passwordInputRef.current.focus()
                // }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                cursorColor={"#ff5733"}
                style={styles.inputStyle}
                onChangeText={login.handleChange("password")}
                placeholder="Enter Password" //12345
                placeholderTextColor="#ff5733"
                keyboardType="default"
                // ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
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
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  register: {
    color: "#FF5733",
  },
});
