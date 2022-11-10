import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MyIp } from "../constants.js";
import { Ionicons } from "@expo/vector-icons";

function Basic() {
  return (
    <View style={styles.cont}>
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
