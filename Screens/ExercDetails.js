import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function ExercDetails({ route }) {
  const i = route.params.exer;

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
      <Image
        source={{
          uri: "https://acewebcontent.azureedge.net/exercise-library/large/7-1.jpg",
        }}
        style={styles.img}
      />
      <View style={styles.textcon}>
        <Text style={styles.text1}>Name </Text>
        <Text style={styles.text}>{i.exerciseName}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Date </Text>
        <Text style={styles.text}>{new Date(i.date).toDateString()}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Target Muscle </Text>
        <Text style={styles.text}>{i.exBodyPart}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Equipment </Text>
        <Text style={styles.text}>{i.exTools}</Text>
      </View>
      <View style={styles.textcon}>
        <Text style={styles.text1}>Notes </Text>
        <Text style={styles.text}>{i.exAdditionNotes}</Text>
      </View>
    </ScrollView>
  );
}

export default ExercDetails;
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
    color: "#ff5733",
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
