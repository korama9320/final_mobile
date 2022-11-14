import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MyIp } from "../constants.js";
import { Ionicons } from "@expo/vector-icons";
import WebView from "react-native-webview";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setuser } from "../Redux/Actions/userAction.js";

function Basic() {
  const Token = AsyncStorage.getItem("token");
  let user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  let [show, setShow] = useState(false);
  async function payment(data) {
    if (data.title == "success") {
      setShow(false);
      let endsin = Math.floor(
        (new Date(user.endDate) - Date.now()) / (1000 * 60 * 60 * 24)
      );
      let date =
        user.endDate &&
        endsin &&
        (user.subscription == "standard" ||
          user.subscription == "premium" ||
          user.subscription == "basic")
          ? user.endDate
          : new Date(Date.now()).toDateString();
      let newend = addDays(date);
      console.log(newend);
      await axios
        .patch(
          `${MyIp}/api/v1/users/update`,
          { subscription: "basic", email: user.email, endDate: newend },
          {
            headers: { authorization: Token },
          }
        )
        .then(() => {
          dispatch(setuser({ subscription: "basic", endDate: newend }));
        });
      alert("Payment Completed");
    } else if (data.title == "cancel") {
      setShow(false);
      alert("Payment Canceled");
    }
  }
  function addDays(date) {
    var result = new Date(date);
    result.setDate(result.getDate() + 30);
    return result;
  }
  return (
    <View style={styles.cont}>
      <Modal
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
      >
        <WebView
          source={{ uri: `${MyIp}/api/v1/users/pp` }}
          onNavigationStateChange={(data) => {
            payment(data);
          }}
          injectedJavaScript={`document.getElementById("price").value="10.00";document.getElementById("item").value="GMSpremium subscription";document.form.submit()`}
        ></WebView>
      </Modal>
      <Text style={styles.header}>
        <Text style={{ color: "#ff5733" }}>10$</Text>/Month
      </Text>
      <Text style={styles.text}>
        <Ionicons
          name="md-checkmark-sharp"
          size={25}
          color="#ff5733"
        ></Ionicons>
        Full Access To The Gym Mechanical Equipment
      </Text>
      <Text style={styles.text}>
        <Ionicons name="close" size={25} color="#ff5733"></Ionicons>
        Exercise Plan Tailored Spicialy For You
      </Text>
      <Text style={styles.text}>
        <Ionicons name="close" size={25} color="#ff5733"></Ionicons>
        Diet Plan Tailored Spicialy For You
      </Text>
      <Text style={styles.text}>
        <Ionicons name="close" size={25} color="#ff5733"></Ionicons>
        Full Access To The Gym Electrical Equipment
      </Text>
      <Text style={styles.text}>
        <Ionicons name="close" size={25} color="#ff5733"></Ionicons>
        Personal Trainer
      </Text>
      <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: "#222",
          height: 60,
          margin: 40,
          justifyContent: "center",
          borderRadius: 100,
          borderColor: "#ff5733",
          borderWidth: 2,
        }}
        onPress={() => {
          setShow(true);
        }}
      >
        <Text style={{ alignSelf: "center", color: "#ff5733", fontSize: 30 }}>
          Subscripe
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Basic;
const styles = StyleSheet.create({
  cont: {
    alignItems: "center",
  },
  header: {
    fontSize: 50,
    color: "#222",
  },
  text: {
    width: "90%",
    fontSize: 25,
    marginVertical: 20,
  },
});
