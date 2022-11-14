import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

function ExerCard(props) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate("Exe-Details", { exer: props.i });
      }}
    >
      <Image source={require("../assets/banner.jpg")} style={styles.img} />
      <View style={{ width: "77%" }}>
        <Text style={styles.text}>{props.i.exerciseName}</Text>
        <Text style={{ paddingHorizontal: 20 }}>
          {new Date(props.i.date).toDateString()}
        </Text>
      </View>
    </Pressable>
  );
}

export default ExerCard;

const styles = StyleSheet.create({
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
