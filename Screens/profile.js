import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { setuser } from "../Redux/Actions/userAction";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userReducer.user);

  const formik = useFormik({
    initialValues: {
      username: user.username,
      address: user.address,
      phoneNumber: user.phoneNumber,
    },
    onSubmit: () => {
      dispatch(setuser(formik.values));
    },
    validationSchema: yup.object({
      username: yup.string().required("Enter UserName").max(20),
      phoneNumber: yup
        .string()
        .matches(/^01[0-9]{9}/)
        .required("Enter Phone Number"),
      address: yup.string().required("Enter Adrdess"),
    }),
  });

  let [code, setCode] = useState("");
  let endsin = Math.floor(
    (new Date(user.endDate) - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            source={{
              uri: "https://cdn.firstcuriosity.com/wp-content/uploads/2022/10/03224440/Q_1664816680-1024x576.jpg",
            }}
            style={{ width: 150, height: 150, borderRadius: 150 }}
          />
          <Text style={{ fontSize: 40, color: "white", paddingBottom: "10%" }}>
            {user.username}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardviwe}>
            <Text style={styles.carditem}>Subscription</Text>
            <Text style={styles.carditem1}>{user.subscription}</Text>
          </View>
          <View style={styles.cardviwe}>
            <Text style={styles.carditem}>Ends In</Text>
            <Text style={styles.carditem1}>{endsin > 0 ? endsin : 0} Days</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <TextInput
            cursorColor={"#ff5733"}
            placeholder="Enter Today's Code"
            placeholderTextColor={"#ff5733"}
            style={{
              width: "100%",
              backgroundColor: "#999999aa",
              height: "10%",
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            onChangeText={(value) => {
              setCode(value), console.log(code);
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={axios.post("", { code: code })}
          >
            <Text style={{ color: "#ff5733" }}>Check In</Text>
          </TouchableOpacity>

          <View style={styles.bottomcard}>
            <Entypo name="mail" size={24} color="#ff5733" />
            <Text style={{ marginHorizontal: "5%" }}>{user.email}</Text>
          </View>
          <View style={styles.bottomcard}>
            <MaterialIcons name="phone-iphone" size={24} color="#ff5733" />
            <TextInput
              cursorColor={"#ff5733"}
              value={formik.values.phoneNumber}
              style={{ marginHorizontal: "5%" }}
              onChangeText={formik.handleChange("phoneNumber")}
            ></TextInput>
          </View>
          <View style={styles.bottomcard}>
            <Ionicons name="location" size={24} color="#ff5733" />
            <TextInput
              cursorColor={"#ff5733"}
              value={formik.values.address}
              style={{ marginHorizontal: "5%" }}
              onChangeText={formik.handleChange("address")}
            ></TextInput>
          </View>
          <View style={styles.bottomcard}>
            <Entypo name="user" size={24} color="#ff5733" />
            <TextInput
              cursorColor={"#ff5733"}
              value={formik.values.username}
              style={{ marginHorizontal: "5%" }}
              onChangeText={formik.handleChange("username")}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={{ color: "#ff5733" }}>Save Changes</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, { marginBottom: 100 }]}>
          <Text style={{ color: "#ff5733" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  cardviwe: { justifyContent: "center", alignItems: "center" },
  top: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#555",
    alignItems: "center",
    height: 300,
  },
  carditem: { color: "#222", fontSize: 20, justifyContent: "center" },
  carditem1: { color: "#ff5733", fontSize: 20, justifyContent: "center" },
  bottom: {
    width: "80%",
    paddingTop: "30%",
    backgroundColor: "#ddd",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: -1,
  },
  bottomcard: {
    height: 55,
    width: "100%",
    flexDirection: "row",
    borderRadius: 2,
    alignItems: "center",
    margin: "1%",
    paddingHorizontal: "5%",
    elevation: 1,
  },
  card: {
    position: "absolute",
    width: "80%",
    height: 80,
    top: 260,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    alignSelf: "center",
    width: "50%",
    height: 60,
    backgroundColor: "#222",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#ff5733",
    borderWidth: 2,
  },
});
