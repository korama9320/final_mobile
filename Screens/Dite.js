import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import DiteCard from "../Components/DiteCard";

function Diet() {
  let dite = useSelector((state) => state.userReducer.user.healthyFoodHistory);

  return (
    <>
      <FlatList
        data={dite}
        numColumns={2}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <DiteCard i={item} />}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
      ></FlatList>
    </>
  );
}

export default Diet;
