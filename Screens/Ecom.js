import { StyleSheet, View, FlatList, TextInput } from "react-native";
import Card from "../Components/Card";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts, setProduce } from "../Redux/Actions/productsAction";
import { MyIp } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Ecom() {
  let [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${MyIp}/api/v1/products/`).then((res) => {
      dispatch(setProducts(res.data));
    });
  }, [produce]);

  const products = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    if (produce.length === 0) {
      dispatch(setProduce(products));
    }
  }, [products]);

  const produce = useSelector((state) => state.produceReducer.produce);
  let user = useSelector((state) => state.userReducer.user);
  let cartt = useSelector((state) => state.cartReducer.cart);
  const token = AsyncStorage.getItem("token");
  useEffect(() => {
    axios.patch(
      `${MyIp}/api/v1/users/update`,
      {
        email: user.email,
        cart: cartt,
      },
      { headers: { authorization: token } }
    );
  }, [cartt]);
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
        contentContainerStyle={{
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-around",
          marginBottom: "5%",
        }}
      ></FlatList>
    </View>
  );
}

export default Ecom;

const style = StyleSheet.create({
  Flat: {
    flex: 1,
    alignItems: "center",
    // marginBottom: 100,
    justifyContent: "center",
  },
  search: {
    width: "90%",
    backgroundColor: "#ddd",
    height: 50,
    borderRadius: 5,
  },
});
