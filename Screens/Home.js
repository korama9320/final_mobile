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
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
function Home() {
  const navigation = useNavigation();
  let user = useSelector((state) => state.userReducer.user);
  function showToast(type, text1, text2) {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  }
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

        <Text style={[styles.text, { top: 20, color: "#ff5733" }]}>
          GMS Health Life Style
        </Text>
        <Text style={[styles.text, { top: 50 }]}>
          {new Date(Date.now()).toDateString()}
        </Text>
      </View>
      <Pressable
        style={styles.card}
        onPress={() => {
          user.exersiceHistory.length > 0
            ? navigation.navigate("Exercise")
            : user.subscription == "standard" || user.subscription == "premium"
            ? showToast("info", "Info", "you will be assigned a trainer soon")
            : navigation.navigate("Standard");
        }}
      >
        <Text style={[styles.text, { top: 140 }]}>Head To Today's WorkOut</Text>

        <Image source={require("../assets/trainer3.jpg")} style={styles.img} />
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={() => {
          user.exersiceHistory.length > 0
            ? navigation.navigate("Diet")
            : user.subscription == "standard" || user.subscription == "premium"
            ? showToast("info", "Info", "you will be assigned a trainer soon")
            : navigation.navigate("Premium");
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
          <View
            style={{
              backgroundColor: "#527DF344",
              width: "100%",
              height: "100%",
              position: "absolute",
              borderRadius: 20,
            }}
          ></View>
          <Text style={{ color: "#527DF3", fontSize: 55 }}>Premium</Text>
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
          <View
            style={{
              backgroundColor: "#f9f29544",
              width: "100%",
              height: "100%",
              position: "absolute",
              borderRadius: 20,
            }}
          ></View>
          <Text style={{ color: "#f9f295", fontSize: 55 }}>Standard</Text>

          <Image source={require("../assets/formBG.jpeg")} style={styles.img} />
        </Pressable>
        <Pressable
          style={styles.card1}
          onPress={() => {
            navigation.navigate("Basic");
          }}
        >
          <View
            style={{
              backgroundColor: "#e5e4e244",
              width: "100%",
              height: "100%",
              position: "absolute",
              borderRadius: 20,
            }}
          ></View>
          <Text style={{ color: "#e5e4e2", fontSize: 55 }}>Basic</Text>

          <Image source={require("../assets/header2.jpg")} style={styles.img} />
        </Pressable>
      </ScrollView>
      <Text style={styles.text1}>Trainers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer2.jpg")}
            style={styles.img}
          />
          <Text style={styles.trainer}>Ali 32y</Text>
        </View>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer4.jpg")}
            style={styles.img}
          />
          <Text style={styles.trainer}>Khaled 22y</Text>
        </View>
        <View style={styles.card1}>
          <Image
            source={require("../assets/trainer3.jpg")}
            style={styles.img}
          />
          <Text style={styles.trainer}>Youssef 28y</Text>
        </View>
      </ScrollView>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate("Store");
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
    color: "#000",
    position: "absolute",
    backgroundColor: "#fff",
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
  trainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    height: "20%",
    backgroundColor: "#999",
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#fff",
  },
});
