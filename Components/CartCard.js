import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/types";
import { Entypo } from "@expo/vector-icons";
import { incount, decount } from "../Redux/Actions/productsAction";
function CartCard(props) {
  const dispatch = useDispatch();
  let cartt = useSelector((state) => state.cartReducer.cart);

  return (
    <>
      <View style={style.card}>
        <Image source={require("../assets/Bags1.jpg")} style={style.img} />
        <View style={{ width: "60%", justifyContent: "space-between" }}>
          <Text style={style.text}>{props.i.title} </Text>

          <Text style={[style.text, { marginStart: 20 }]}>
            {props.i.price} EGP
          </Text>
          <View style={{ flexDirection: "row", marginStart: 15 }}>
            <Entypo
              name={"squared-minus"}
              size={30}
              color="#ff5733"
              onPress={() => {
                dispatch(decount(props.i));
              }}
            />
            <Text
              style={[
                style.text,
                { position: "relative", bottom: 9, fontSize: 20 },
              ]}
            >
              {props.i.count}
            </Text>
            <Entypo
              name={"squared-plus"}
              size={30}
              color="#ff5733"
              onPress={() => {
                dispatch(incount(props.i));
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default CartCard;

const style = StyleSheet.create({
  card: {
    width: "90%",
    height: 160,
    marginVertical: "2%",
    marginHorizontal: "5%",
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#222",
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
  },
  img: { width: "40%", height: "100%", borderTopLeftRadius: 10 },
  text: { color: "#fff", margin: 10, fontSize: 15 },
});
