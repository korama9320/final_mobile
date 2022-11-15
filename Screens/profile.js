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
  Platform,
} from "react-native";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { resetusers, setuser } from "../Redux/Actions/userAction";
import { Fragment, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyIp } from "../constants";
import * as ImagePicker from "expo-image-picker";
import constants from "expo-constants";
function Profile() {
  /////////////////////////upload image////////////////////
  const [image, setImage] = useState("");
  const PickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
      console.log(result.uri);
      try {
        const formdata = new FormData();
        formdata.append("proImg", {
          name: result.fileName,
          type: "image/jpg",
          path: image,
        });
        formdata.append("email", user.email);

        await axios
          .patch(`${MyIp}/api/v1/users/updateProImg`, formdata, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {});
      } catch {
        console.log("error");
      }
    }
  };
  ///////////////////////////////update form///////////////////////////
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userReducer.user);

  let profile = useFormik({
    initialValues: {
      lastName: user.lastName,
      firstName: user.firstName,
      address: user.address,
      phoneNumber: user.phoneNumber,
    },
    validationSchema: yup.object({
      firstName: yup.string().required("Enter firstName").max(20),
      lastName: yup.string().required("Enter lastName").max(20),
      phoneNumber: yup
        .string()
        .matches(/^01[0-9]{9}/)
        .required("Enter Phone Number"),
      address: yup.string().required("Enter Adrdess"),
    }),
    onSubmit: async (values) => {
      const Token = await AsyncStorage.getItem("token");
      axios
        .patch(
          `${MyIp}/api/v1/users/update`,
          { ...values, email: user.email },
          {
            headers: { authorization: Token },
          }
        )
        .then(() => {
          dispatch(setuser(values));
        })
        .catch("error");
    },
  });
  ////////////////////////////////////sign out///////////////////////////////////
  function signout() {
    AsyncStorage.clear().then(() => {
      dispatch(resetusers()), navigation.navigate("Login");
    });
  }
  ///////////////////////////////////check in function////////////////////////////////
  let [code, setCode] = useState("");
  async function checkin() {
    const Token = await AsyncStorage.getItem("token");

    axios
      .post(
        `${MyIp}/api/v1/users/attendce`,
        { code: code, email: user.email },
        {
          headers: { authorization: Token },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch(console.log("error"));
  }
  let [shown, setShown] = useState(1);
  ////////////////////////////////un sub//////////////////////////////////
  let endsin = Math.floor(
    (new Date(user.endDate) - Date.now()) / (1000 * 60 * 60 * 24)
  );
  (async () => {
    const Token = await AsyncStorage.getItem("token");

    if (endsin <= 0) {
      axios
        .patch(
          `${MyIp}/api/v1/users/update`,
          { subscription: "none", email: user.email },
          {
            headers: { authorization: Token },
          }
        )
        .then(() => {
          dispatch(setuser({ subscription: "none" }));
        });
    }
  })();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.top}>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={{ width: 150, height: 150, borderRadius: 150 }}
            />
          ) : user.profileImage ? (
            <Image
              source={{
                uri: MyIp + user.profileImage,
              }}
              style={{ width: 150, height: 150, borderRadius: 150 }}
            />
          ) : (
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTliHgn_qvmRTNu7yo7ZaPFtu7gLlZs8MytxA&usqp=CAU",
              }}
              style={{ width: 150, height: 150, borderRadius: 150 }}
            />
          )}
          <Entypo
            name="circle-with-plus"
            size={30}
            color="#fff"
            style={{ position: "absolute", left: "58%", top: "50%" }}
            onPress={PickImage}
          ></Entypo>
          <Text style={{ fontSize: 35, color: "white", paddingBottom: "10%" }}>
            Hi,{user.firstName}
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
          <View style={styles.tabbar}>
            <Text
              onPress={() => {
                setShown(1);
              }}
              style={[styles.tab, { color: shown == 1 ? "#ff5733" : "#ddd" }]}
            >
              CheckIn
            </Text>
            <Text
              onPress={() => {
                setShown(2);
              }}
              style={[styles.tab, { color: shown == 2 ? "#ff5733" : "#ddd" }]}
            >
              Update Info
            </Text>
            <Text
              onPress={() => {
                setShown(3);
              }}
              style={[styles.tab, { color: shown == 3 ? "#ff5733" : "#ddd" }]}
            >
              Log Out
            </Text>
          </View>
          {shown == 1 && (
            <>
              <TextInput
                cursorColor={"#ff5733"}
                placeholder="Enter Today's Code"
                placeholderTextColor={"#ff5733"}
                style={{
                  width: "100%",
                  backgroundColor: "#999999aa",
                  height: 60,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
                onChangeText={(value) => {
                  setCode(value);
                }}
              />
              <TouchableOpacity style={styles.button} onPress={checkin}>
                <Text style={{ color: "#ff5733" }}>Check In</Text>
              </TouchableOpacity>
            </>
          )}

          {shown == 2 && (
            <>
              <View style={styles.bottomcard}>
                <Entypo name="mail" size={24} color="#ff5733" />
                <Text style={{ marginHorizontal: "5%" }}>{user.email}</Text>
              </View>
              <View style={styles.bottomcard}>
                <MaterialIcons name="phone-iphone" size={24} color="#ff5733" />
                <TextInput
                  cursorColor={"#ff5733"}
                  style={{ marginHorizontal: "5%", width: "80%" }}
                  onChangeText={profile.handleChange("phoneNumber")}
                  placeholder="Phone Number"
                >
                  <Text style={{ fontSize: 15 }}>{user.phoneNumber}</Text>
                </TextInput>
              </View>
              <View style={styles.bottomcard}>
                <Ionicons name="location" size={24} color="#ff5733" />
                <TextInput
                  cursorColor={"#ff5733"}
                  style={{ marginHorizontal: "5%", width: "80%" }}
                  onChangeText={profile.handleChange("address")}
                  placeholder="Location"
                >
                  <Text style={{ fontSize: 15 }}>{user.address}</Text>
                </TextInput>
              </View>
              <View style={styles.bottomcard}>
                <Entypo name="user" size={24} color="#ff5733" />
                <TextInput
                  cursorColor={"#ff5733"}
                  style={{ marginHorizontal: "5%", width: "80%" }}
                  onChangeText={profile.handleChange("firstName")}
                  placeholder="First Name"
                >
                  <Text style={{ fontSize: 15 }}>{user.firstName}</Text>
                </TextInput>
              </View>
              <View style={styles.bottomcard}>
                <Entypo name="user" size={24} color="#ff5733" />
                <TextInput
                  cursorColor={"#ff5733"}
                  style={{ marginHorizontal: "5%", width: "80%" }}
                  onChangeText={profile.handleChange("lastName")}
                  placeholder="Last Name"
                >
                  <Text style={{ fontSize: 15 }}>{user.lastName}</Text>
                </TextInput>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={profile.handleSubmit}
              >
                <Text style={{ color: "#ff5733" }}>Save Changes</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {shown == 3 && (
          <TouchableOpacity
            style={[styles.button, { marginBottom: 100 }]}
            onPress={signout}
          >
            <Text style={{ color: "#ff5733" }}>Sign Out</Text>
          </TouchableOpacity>
        )}
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
    width: "90%",
    height: 70,
    top: 265,
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
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#222",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
  },
  tab: {
    flex: 1,
    fontSize: 15,
    color: "#ddd",
    textAlign: "center",
  },
});
