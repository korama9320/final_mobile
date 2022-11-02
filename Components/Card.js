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
        <Image source={require("../assets/Bags1.jpg")} style={style.img} />
        <Text style={style.text}>{props.i.title} </Text>
        <View
          style={{
            position: "absolute",
            bottom: 2,
            flexDirection: "row",
          }}
        >
          <Text style={[style.text, { marginStart: 20 }]}>
            {props.i.price} EGP
          </Text>
          <MaterialCommunityIcons
            name={x ? "basket-check" : "basket-plus-outline"}
            size={30}
            color="#ff5733"
            style={{ position: "absolute", left: 120 }}
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
    width: "45%",
    height: 250,
    margin: 7,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#222",
    elevation: 10,
  },
  img: { width: "100%", height: "60%", borderTopLeftRadius: 10 },
  text: { color: "#fff", margin: 7 },
});
