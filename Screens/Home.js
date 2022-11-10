import { TabActions, useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar></StatusBar>
      <View style={[styles.header, { backgroundColor: "#ddd" }]}>
        <Image
          source={require("../assets/banner.jpg")}
          style={{
            position: "relative",
            top: 0,
            bottom: 0,
            width: "100%",
            height: 250,
          }}
        ></Image>
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <Svg
            width={"100%"}
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <Polygon
              points="0,100 0,87 50,100 100,87 100,100"
              fill={"#ddd"}
            ></Polygon>
          </Svg>
        </View>

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          style={styles.card1}
          onPress={() => {
            navigation.navigate("Premium");
          }}
        >
          <Text style={{ color: "#e6192e", fontSize: 55 }}>Premium</Text>
          <Image
            source={require("../assets/workout3.jpg")}
            style={styles.img}
          />
        </Pressable>
        <Pressable
          style={styles.card1}
          onPress={() => {
            navigation.navigate("Standard");
          }}
        >
          <Text style={{ color: "#f9f295", fontSize: 55 }}>Standard</Text>

          <Image source={require("../assets/formBG.jpeg")} style={styles.img} />
        </Pressable>
        <Pressable
          style={styles.card1}
          onPress={() => {
            navigation.navigate("Basic");
          }}
        >
          <Text style={{ color: "#e5e4e2", fontSize: 55 }}>Basic</Text>

          <Image source={require("../assets/header2.jpg")} style={styles.img} />
        </Pressable>
      </ScrollView>
      <Text style={styles.text1}>Trainers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    width: "95%",
    height: 175,
    backgroundColor: "#ddd",
    margin: 30,
    borderRadius: 20,
    elevation: 10,
  },
  card1: {
    width: 300,
    height: 175,
    backgroundColor: "#aaa",
    marginVertical: 30,
    marginHorizontal: 7,
    borderRadius: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    alignSelf: "flex-start",
    paddingHorizontal: "6%",
    color: "#222",
    fontWeight: "bold",
    fontSize: 25,
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
