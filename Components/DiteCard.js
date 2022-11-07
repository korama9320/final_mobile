import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
function DiteCard(props) {
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate("Diet-Details", { diet: props.i });
        }}
      >
        <Text
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            backgroundColor: "#ff5733",
            zIndex: 1,
            color: "#fff",
            padding: 3,
            borderRadius: 20,
          }}
        >
          {props.i.foodTime}
        </Text>
        <Image source={require("../assets/diet5.jpg")} style={styles.img} />
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>{props.i.foodName}</Text>
          <Text style={{ alignSelf: "flex-start", paddingHorizontal: 10 }}>
            {new Date(props.i.date).toDateString()}
          </Text>
        </View>
      </Pressable>
    </>
  );
}

export default DiteCard;
const styles = StyleSheet.create({
  card: {
    marginVertical: 15,
    alignSelf: "center",
    width: "45%",
    height: 150,
    backgroundColor: "#ddd",
    elevation: 7,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  img: {
    height: "60%",
    resizeMode: "stretch",
    width: "100%",
    borderTopLeftRadius: 10,
    alignSelf: "center",
  },
  text: {
    alignSelf: "flex-start",
    textAlignVertical: "center",
    backgroundColor: "#666",
    paddingHorizontal: 10,
    color: "#fff",
    width: "100%",
    height: "25%",
    fontSize: 15,
    elevation: 2,
    borderBottomRightRadius: 10,
  },
});
