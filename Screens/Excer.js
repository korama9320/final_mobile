import { FlatList, Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ExerCard from "../Components/ExerCard";

function Exercise() {
  let exerc = useSelector((state) => state.userReducer.user.exersiceHistory);
  return (
    <FlatList
      data={exerc}
      numColumns={1}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <ExerCard i={item} />}
    ></FlatList>
  );
}

export default Exercise;
