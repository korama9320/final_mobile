import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MyIp } from "../constants";

function DietDetails({ route }) {
  const i = route.params.diet;

  return (
    <ScrollView
      contentContainerStyle={{
        width: "90%",
        alignItems: "center",
        backgroundColor: "#ddd",
        marginHorizontal: "5%",
        marginVertical: "5%",
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingBottom: "5%",
      }}
    >
      <Image source={{ uri: MyIp + i.imgFood }} style={styles.img} />
      <View style={styles.textcon}>
        <Text style={styles.text1}>Meal</Text>
        <Text style={styles.text}>{i.foodTime}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Name</Text>
        <Text style={styles.text}>{i.foodName}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Date</Text>
        <Text style={styles.text}>{new Date(i.date).toDateString()}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Ingredients</Text>
        <Text style={styles.text}>{i.ingredients}</Text>
      </View>
    </ScrollView>
  );
}

export default DietDetails;
const styles = StyleSheet.create({
  img: {
    width: "95%",
    height: 200,
    margin: "2.5%",
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  text: {
    width: "100%",
    fontSize: 20,
    color: "#222",
    marginHorizontal: "3%",
    padding: "3%",
    backgroundColor: "#eee",
    marginBottom: "5%",
    borderBottomRightRadius: 10,
  },
  text1: {
    padding: "3%",
    borderTopLeftRadius: 10,
    width: "100%",
    fontSize: 20,
    color: "#fff",
    marginHorizontal: "3%",
    backgroundColor: "#777",
  },
  textcon: {
    width: "95%",
    alignSelf: "flex-start",
    flexDirection: "column",
  },
});
