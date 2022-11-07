import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function Calculate({ route }) {
  const user = useSelector((state) => state.userReducer.user);
  const BMR =
    user.gender == "male"
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
      : user.gender == "female"
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age - 161
      : 1200;

  const active = route.params.act;
  return (
    <ScrollView contentContainerStyle={styles.cont}>
      <Text
        style={{
          fontSize: 30,
          backgroundColor: "#ddd",
          padding: 15,
          margin: 15,
          textAlign: "center",
          borderRadius: 50,
          elevation: 20,
          color: "#222",
        }}
      >
        Estimated Healthy Ranges
      </Text>
      <View style={styles.card}>
        <Text style={styles.text1}>BMR</Text>
        <Text style={styles.text}>{BMR}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text1}>BMI</Text>

        <Text style={styles.text}>
          {(user.weight / Math.pow(user.height / 100, 2)).toFixed(2)}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text1}> Weight</Text>

        <Text style={styles.text}>
          {(19 * Math.pow(user.height / 100, 2)).toFixed(0)}-
          {(25 * Math.pow(user.height / 100, 2)).toFixed(0)} kg
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text1}>Protine</Text>

        <Text style={styles.text}>
          {Math.ceil(user.weight * 0.8 * active) ||
            Math.ceil(user.weight * 0.8 * 1.2)}
          grm
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text1}> Calories </Text>

        <Text style={styles.text}>{BMR * active || BMR * 1.2}cal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text1}> Fat </Text>

        <Text style={styles.text}>
          {user.age < 40 ? "21-32" : user.age < 60 ? "23-35" : "24-36"}
        </Text>
      </View>
    </ScrollView>
  );
}

export default Calculate;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: {
    width: "40%",
    height: "15%",
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 10,
    textAlign: "center",
    margin: "5%",
    elevation: 10,
  },

  text: {
    color: "#222",
    fontSize: 30,
  },
  text1: {
    color: "#ff5733",
    fontSize: 30,
  },
});
