import { TabActions, useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.header}>
        <Image
          source={require("../assets/banner.jpg")}
          style={{ width: "100%", height: 250 }}
        ></Image>
        <Text style={[styles.text, { top: 20 }]}>GMS Health Life Style</Text>
        <Text style={[styles.text, , { top: 50 }]}>
          {new Date(Date.now()).toDateString()}
        </Text>
      </View>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate("Exercise");
        }}
      >
        <Text style={[styles.text, { top: 140 }]}>Head To Today's WorkOut</Text>

        <Image source={require("../assets/trainer3.jpg")} style={styles.img} />
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate("Diet");
        }}
      >
        <Text style={[styles.text, { top: 140 }]}>
          Check Out Our New Recipies
        </Text>

        <Image source={require("../assets/diet4.jpg")} style={styles.img} />
      </Pressable>
      <Text style={styles.text1}>Subscription</Text>
      <ScrollView horizontal>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
        </View>
      </ScrollView>
      <Text style={styles.text1}>Trainers</Text>
      <ScrollView horizontal>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
        </View>
      </ScrollView>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate("E-com");
        }}
      >
        <Text
          style={{
            color: "#ff5733",
            position: "absolute",
            paddingHorizontal: 10,
            fontWeight: "bold",
            fontSize: 30,
            top: 120,
          }}
        >
          Shop Now
        </Text>

        <Image source={require("../assets/slider4.jpg")} style={styles.img} />
      </Pressable>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 250,
  },
  text: {
    color: "#ff5733",
    position: "absolute",
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    borderRadius: 3,
    fontWeight: "bold",
  },
  card: {
    width: "80%",
    height: 175,
    backgroundColor: "#ddd",
    margin: 20,
    borderRadius: 20,
    elevation: 10,
  },
  card1: {
    width: 300,
    height: 175,
    backgroundColor: "#222",
    margin: 20,
    borderRadius: 20,
    elevation: 10,
  },
  text1: {
    alignSelf: "flex-start",
    paddingHorizontal: "6%",
    color: "#FFF",
    fontWeight: "bold",
  },
  img: {
    width: "100%",
    resizeMode: "stretch",
    position: "absolute",
    height: "100%",
    borderRadius: 20,
    zIndex: -1,
  },
});
