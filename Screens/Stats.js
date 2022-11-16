import { useDispatch, useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import { useState } from "react";
import { setuser } from "../Redux/Actions/userAction";
import { useNavigation } from "@react-navigation/native";
import { Field, useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MyIp } from "../constants";
function Stats() {
  ///////////////////////////////calculaton submit///////////////////////////////
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userReducer.user);
  let [active, setActive] = useState(0);

  const navigation = useNavigation();
  const statistics = useFormik({
    initialValues: {
      gender: user.gender,
      weight: user.weight,
      height: user.height,
      age: user.age,
      fat: "",
    },
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

          navigation.navigate("Calculated", { act: active });
        })
        .catch("error");
    },
  });
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* ///////////////////////////////////////////////gender////////////////////////////////////// */}
      {/* <StatusBar></StatusBar> */}

      <View style={styles.titles}>
        <Text style={{ marginTop: 10 }}>
          <Ionicons name="md-male-female-outline" color={"#ff5733"} size={20} />
          Gender
        </Text>
      </View>
      <View style={styles.gender}>
        {/* ///////////////////////////////////////////////male////////////////////////////////////// */}

        <TouchableOpacity
          style={[
            styles.card,
            user.gender == "female" && { backgroundColor: "#bbb" },
          ]}
          onPress={() => {
            dispatch(setuser({ gender: "male" }));
            statistics.setFieldValue("gender", "male");
          }}
        >
          <MaterialCommunityIcons name="gender-male" color={"#222"} size={55} />
          <Text style={{ fontSize: 25, color: "#777" }}>Male</Text>
        </TouchableOpacity>
        {/* ///////////////////////////////////////////////female////////////////////////////////////// */}

        <TouchableOpacity
          style={[
            styles.card,
            user.gender == "male" && { backgroundColor: "#bbb" },
          ]}
          onPress={() => {
            dispatch(setuser({ gender: "female" }));
            statistics.setFieldValue("gender", "female");
          }}
        >
          <MaterialCommunityIcons
            name="gender-female"
            color={"#222"}
            size={55}
          />
          <Text style={{ fontSize: 25, color: "#777" }}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* ///////////////////////////////////////////////weight////////////////////////////////////// */}

      <View style={styles.weight}>
        <View style={styles.card}>
          <Text>
            <MaterialCommunityIcons
              name="scale-bathroom"
              color={"#ff5733"}
              size={20}
            />
            Weight
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TextInput
              keyboardType="numeric"
              cursorColor="#ff5733"
              style={{ color: "#222", fontSize: 55 }}
              onChangeText={statistics.handleChange("weight")}
            >
              <Text style={{ fontSize: 55 }}>{user.weight}</Text>
            </TextInput>
            <Text style={{ fontSize: 20 }}>kg</Text>
          </View>
        </View>
        {/* ///////////////////////////////////////////////height////////////////////////////////////// */}

        <View style={styles.card}>
          <Text>
            <MaterialCommunityIcons name="ruler" color={"#ff5733"} size={20} />
            Hight
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TextInput
              keyboardType="numeric"
              cursorColor="#ff5733"
              style={{ color: "#222", fontSize: 55 }}
              onChangeText={statistics.handleChange("height")}
            >
              <Text style={{ fontSize: 55 }}>{user.height}</Text>
            </TextInput>
            <Text style={{ fontSize: 20 }}>cm</Text>
          </View>
        </View>
      </View>
      {/* ///////////////////////////////////////////////AGE////////////////////////////////////// */}

      <View style={styles.age}>
        <View style={styles.card}>
          <Text>
            <MaterialCommunityIcons
              name="clock-outline"
              color={"#ff5733"}
              size={20}
            />
            Age
          </Text>
          <TextInput
            keyboardType="numeric"
            cursorColor="#ff5733"
            style={{ color: "#222", fontSize: 55 }}
            onChangeText={statistics.handleChange("age")}
          >
            <Text style={{ fontSize: 55 }}>{user.age}</Text>
          </TextInput>
        </View>
        {/* ///////////////////////////////////////////////FAT////////////////////////////////////// */}

        <View style={styles.card}>
          <Text>
            <MaterialCommunityIcons
              name="percent-outline"
              color={"#ff5733"}
              size={20}
            />
            Fat
          </Text>
          <TextInput
            keyboardType="numeric"
            cursorColor="#ff5733"
            style={{ color: "#222", fontSize: 55 }}
            onChangeText={statistics.handleChange("fat")}
          >
            <Text style={{ fontSize: 55 }}>{user.fat}</Text>
          </TextInput>
        </View>
      </View>
      {/* ///////////////////////////////////////////////ACTIVITY////////////////////////////////////// */}

      <View style={styles.titles}>
        <Text>
          <MaterialCommunityIcons
            name="weight-lifter"
            color={"#ff5733"}
            size={20}
          />
          Activity Level
        </Text>
      </View>

      {/* ///////////////////////////SCROLL///////////////////////////////////// */}
      <ScrollView
        horizontal
        style={styles.activity}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[styles.card1, active == 1.2 && { backgroundColor: "#ddd" }]}
          onPress={() => {
            setActive(1.2);
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              height: "80%",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 15 }}>Sedentary</Text>
            <Text style={{ fontSize: 10 }}>Little or no exercise</Text>
          </View>
          <Image
            source={require("../assets/cal/1111.png")}
            style={{ width: "40%", height: "80%" }}
          />
        </TouchableOpacity>
        {/* //////////////////////////////////////////////////////////// */}
        <TouchableOpacity
          style={[styles.card1, active == 1.375 && { backgroundColor: "#ddd" }]}
          onPress={() => {
            setActive(1.375);
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              height: "80%",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 15 }}>Light</Text>
            <Text style={{ fontSize: 10 }}>Exercise 1-3 times/weak</Text>
          </View>
          <Image
            source={require("../assets/cal/333.webp")}
            style={{ width: "40%", height: "80%" }}
          />
        </TouchableOpacity>
        {/* ///////////////////////////////////////////////////////////////////// */}
        <TouchableOpacity
          style={[styles.card1, active == 1.45 && { backgroundColor: "#ddd" }]}
          onPress={() => {
            setActive(1.45);
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              height: "80%",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 15 }}>Moderate</Text>
            <Text style={{ fontSize: 10 }}>Exercise 4-5 times/weak</Text>
          </View>
          <Image
            source={require("../assets/cal/33.webp")}
            style={{ width: "35%", height: "80%" }}
          />
        </TouchableOpacity>
        {/* ///////////////////////////// */}
        <TouchableOpacity
          style={[styles.card1, active == 1.55 && { backgroundColor: "#ddd" }]}
          onPress={() => {
            setActive(1.55);
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              height: "80%",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 15 }}>Active</Text>
            <Text style={{ fontSize: 10 }}>
              Daily exercise or intense exercise 3-4 times/weak
            </Text>
          </View>
          <Image
            source={require("../assets/cal/4.png")}
            style={{ width: "40%", height: "80%" }}
          />
        </TouchableOpacity>
        {/* //////////////////////////////////////////////////////////////////////////// */}
        <TouchableOpacity
          style={[styles.card1, active == 1.725 && { backgroundColor: "#ddd" }]}
          onPress={() => {
            setActive(1.725);
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              height: "80%",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 15 }}>Very Active</Text>
            <Text style={{ fontSize: 10 }}>
              Intense exercise 6-7 times/weak
            </Text>
          </View>
          <Image
            source={require("../assets/cal/5.png")}
            style={{ width: "40%", height: "80%" }}
          />
        </TouchableOpacity>
        {/* ////////////////////////////////////////////////////////////////////////// */}
        <TouchableOpacity
          style={[styles.card1, active == 1.9 && { backgroundColor: "#ddd" }]}
          onPress={() => {
            setActive(1.9);
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              height: "80%",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 15 }}>Extra Active</Text>
            <Text style={{ fontSize: 10 }}>Daily intense exercise</Text>
          </View>
          <Image
            source={require("../assets/cal/6.webp")}
            style={{ width: "40%", height: "80%" }}
          />
        </TouchableOpacity>
      </ScrollView>
      {/* ///////////////////////////////////////////////CALCULATE////////////////////////////////////// */}

      <TouchableOpacity style={styles.calc} onPress={statistics.handleSubmit}>
        <Text style={{ color: "#ff5733", fontSize: 20 }}>CALCULATE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Stats;
const styles = StyleSheet.create({
  gender: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  weight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  age: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  activity: {
    flex: 1,
    marginVertical: 10,
  },
  calc: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#222",
    alignSelf: "center",
    width: "80%",
    borderRadius: 50,
    borderColor: "#ff5733",
    borderWidth: 2,
    marginVertical: 20,
    height: 70,
  },
  card: {
    width: "45%",
    height: "90%",
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 10,
    textAlign: "center",
    elevation: 10,
  },
  card1: {
    width: 200,
    height: 100,
    backgroundColor: "#bbb",
    borderRadius: 10,
    margin: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 7,
    elevation: 10,
  },
  titles: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: "7%",
    marginTop: "10%",
  },
});
