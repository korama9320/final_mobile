import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, decount } from "../Redux/Actions/productsAction";
function Card(props) {
  const dispatch = useDispatch();
  let cartt = useSelector((state) => state.cartReducer.cart);
  let x = cartt.find((item) => item.title == props.i.title);
  return (
    <>
      <View style={style.card}>
        <Image source={props.i.image[0]} style={style.img} />
        <Text style={style.text}>{props.i.title} </Text>
        <View
          style={{
            position: "absolute",
            bottom: 2,
            flexDirection: "row",
            width: "85%",
            justifyContent: "space-between",
          }}
        >
          <Text style={[style.text]}>{props.i.price} EGP</Text>
          <MaterialCommunityIcons
            name={x ? "basket-check" : "basket-plus-outline"}
            size={30}
            style={{ padding: 5 }}
            color="#ff5733"
            onPress={() => {
              x ? dispatch(decount(props.i)) : dispatch(addtoCart(props.i));
            }}
          />
        </View>
      </View>
    </>
  );
}

export default Card;

const style = StyleSheet.create({
  card: {
    width: "46%",
    height: 240,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#222",
    elevation: 5,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 10,
    resizeMode: "stretch",
  },
  text: { color: "#fff", padding: 7, fontSize: 13, textAlign: "left" },
});
