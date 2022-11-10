import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CartCard from "../Components/CartCard.js";
import { MyIp } from "../constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkoutt } from "../Redux/Actions/productsAction.js";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  let cartt = useSelector((state) => state.cartReducer.cart);
  let x = 0;
  let user = useSelector((state) => state.userReducer.user);

  for (let i of cartt) {
    x += i.price * i.count;
  }
  function checkout() {
    if ((user.email, user.address, user.phoneNumber)) {
      axios
        .post(`${MyIp}/api/v1/users/placeorder`, {
          email: user.email,
        })
        .then((res) => {
          dispatch(checkoutt());
          alert("Your order has been placed successfuly");
        });
    } else {
      alert("Please fill in your phone number and address");
    }
  }
  const token = AsyncStorage.getItem("token");

  useEffect(() => {
    console.log(cartt);
    axios.patch(
      `${MyIp}/api/v1/users/update`,
      {
        email: user.email,
        cart: cartt,
      },
      { headers: { authorization: token } }
    );
  }, [cartt]);
  return (
    <>
      <Text
        style={{
          backgroundColor: "#222",
          height: 50,
          color: "#FFF",
          fontSize: 20,
          textAlign: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: "#ff5733" }}>T</Text>otal : {x}
        <Text style={{ color: "#ff5733", position: "relative" }}>EGP</Text>
      </Text>
      <FlatList
        data={cartt}
        numColumns={1}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <CartCard i={item} />}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      <TouchableOpacity style={styles.apply} onPress={checkout}>
        <Text style={{ color: "#ff5733", fontSize: 30 }}>CheckOut</Text>
      </TouchableOpacity>
    </>
  );
}

export default Cart;
const styles = StyleSheet.create({
  apply: {
    backgroundColor: "#222",
    width: "80%",
    height: 70,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#ff5733",
    borderWidth: 2,
  },
});
