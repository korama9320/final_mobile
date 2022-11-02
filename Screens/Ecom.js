import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import prod from "../assets/e-com";
import Card from "../Components/Card";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts, setProduce } from "../Redux/Actions/productsAction";

function Ecom() {
  let [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(prod));
  }, [dispatch]);

  const products = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    if (produce.length === 0) {
      dispatch(setProduce(products));
    }
  }, [products]);

  const produce = useSelector((state) => state.produceReducer.produce);
  let user = useSelector((state) => state.userReducer.user);
  let cartt = useSelector((state) => state.cartReducer.cart);
  // useEffect(() => {
  //   axios.post("http://localhost:8000/api/v1/users/update", {
  //     email: user.email,
  //     cart: cartt,
  //   });
  // }, [cartt]);
  function search() {
    const val = input.toLowerCase();
    let reg = new RegExp(val);
    let x = products.filter((i) => reg.test(i.title.toLowerCase()));
    dispatch(setProduce(x));
  }

  function change(input) {
    setInput(input);
  }

  return (
    <View style={style.Flat}>
      <View
        style={{
          width: "92%",
          backgroundColor: "#ddd",
          height: 50,
          margin: 10,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
          cursorColor={"#ff5733"}
          style={style.search}
          onChangeText={change}
          value={input}
          placeholder={"Search Type Product Name"}
          onSubmitEditing={search}
        ></TextInput>
        <Ionicons
          name="search"
          size={25}
          color="#222"
          onPress={search}
        ></Ionicons>
      </View>
      <FlatList
        data={produce}
        numColumns={2}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Card i={item} />}
      ></FlatList>
    </View>
  );
}

export default Ecom;

const style = StyleSheet.create({
  Flat: {
    alignItems: "center",
    marginBottom: 100,
  },
  search: {
    width: "90%",
    backgroundColor: "#ddd",
    height: 50,
    borderRadius: 5,
  },
});
