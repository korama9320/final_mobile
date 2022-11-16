import { StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/types";
import { Entypo } from "@expo/vector-icons";
import { incount, decount } from "../Redux/Actions/productsAction";
import { MyIp } from "../constants";
function CartCard(props) {
  const dispatch = useDispatch();

  return (
    <>
      <View style={style.card}>
        <Image source={{ uri: MyIp + props.i.image[0] }} style={style.img} />
        <View style={{ width: "60%", justifyContent: "space-between" }}>
          <Text style={style.text}>{props.i.title} </Text>

          <View
            style={{
              flexDirection: "row",
              marginStart: 15,
              justifyContent: "space-between",
              position: "absolute",
              bottom: 0,
              right: 10,
            }}
          >
            <Text style={style.text}>{props.i.price} EGP</Text>
            <View style={{ flexDirection: "row", marginEnd: 5 }}>
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
                  { position: "relative", bottom: 5, fontSize: 20 },
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
      </View>
    </>
  );
}

export default CartCard;

const style = StyleSheet.create({
  card: {
    width: "90%",
    height: 120,
    marginVertical: "2%",
    marginHorizontal: "5%",
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#222",
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
  },
  img: {
    width: "40%",
    height: "100%",
    borderTopLeftRadius: 10,
    resizeMode: "stretch",
  },
  text: { color: "#fff", margin: 5, fontSize: 15 },
});
