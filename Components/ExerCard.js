import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MyIp } from "../constants";
import Checkbox from "expo-checkbox";
import { useDispatch } from "react-redux";
import { setuser } from "../Redux/Actions/userAction";
import { useState } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
function ExerCard(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userReducer.user);
  let index = user.exersiceHistory.findIndex(
    (item) => item.exerciseName == props.i.exerciseName
  );
  let newex = [...user.exersiceHistory];
  async function handelcheck() {
    newex[index].finsh = !newex[index].finsh;
    console.log(newex);
    dispatch(setuser({ exerciseName: newex }));
    const token = await AsyncStorage.getItem("token");

    axios.patch(
      `${MyIp}/api/v1/users/update`,
      {
        email: user.email,
        exerciseName: newex,
      },
      { headers: { authorization: token } }
    );
  }

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate("Exe-Details", { exer: props.i });
      }}
    >
      <Image
        source={{
          uri: MyIp + "/" + props.i.exStaticImage,
        }}
        style={styles.img}
      />
      <View style={{ width: "77%" }}>
        <Text style={styles.text}>{props.i.exerciseName}</Text>
        <Text style={{ paddingHorizontal: 20 }}>
          {new Date(props.i.date).toDateString()}
        </Text>
        <Checkbox
          style={styles.checkbox}
          value={props.i.finsh}
          onValueChange={handelcheck}
          color={"#ff5733"}
        />
      </View>
    </Pressable>
  );
}

export default ExerCard;

const styles = StyleSheet.create({
  checkbox: {
    position: "absolute",
    right: 10,
    top: "50%",
  },
  card: {
    marginVertical: 15,
    padding: "1%",
    alignSelf: "center",
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  img: {
    height: "95%",
    resizeMode: "stretch",
    width: "20%",
    marginRight: "2%",
    alignSelf: "center",
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    // borderColor: "#ff5733",
    // borderWidth: 2,
  },
  text: {
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    textAlignVertical: "center",
    backgroundColor: "#444",
    paddingHorizontal: 20,
    color: "#fff",
    width: "100%",
    fontSize: 17,
    padding: 5,
    elevation: 10,
    shadowColor: "#ff5733",
    shadowOpacity: "100%",
    shadowRadius: 20,
    shadowOffset: 10,
  },
});
