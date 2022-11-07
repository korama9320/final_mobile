import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import Slider from "@react-native-community/slider";
import { setProduce } from "../Redux/Actions/productsAction";
import { StackActions, useNavigation } from "@react-navigation/native";

function DrawerEcom() {
  const navigation = useNavigation();

  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  let [search, setSearch] = useState({
    sort: "",
    min: 0,
    max: 2000,
    ALL: true,
    Supplements: false,
    Resistanceband: false,
    proteinshakers: false,
    Bags: false,
    Weights: false,
    Accessories: false,
  });
  let [slider, setSlider] = useState({ mi: 0, ma: 2000 });

  function sorted(a, b) {
    if (search.sort == "price1") {
      if (a.price < b.price) {
        return 1;
      } else if (a.price > b.price) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (a[search.sort] > b[search.sort]) {
        return 1;
      } else if (a[search.sort] < b[search.sort]) {
        return -1;
      } else {
        return 0;
      }
    }
  }
  function searched() {
    let sear = products.filter(
      (i) => i.price > search.min && i.price < search.max
    );
    let filterd = sear.filter((i) => {
      return search.ALL
        ? i.category === "Supplements" ||
            i.category === "Resistance band" ||
            i.category === "bottles" ||
            i.category === "Bags" ||
            i.category === "Weights" ||
            i.category === "Accessories"
        : (search.Supplements && i.category === "Supplements") ||
            (search.Resistanceband && i.category === "Resistance band") ||
            (search.proteinshakers && i.category === "bottles") ||
            (search.Bags && i.category === "Bags") ||
            (search.Weights && i.category === "Weights") ||
            (search.Accessories && i.category === "Accessories");
    });
    let sor = filterd.sort(sorted);
    dispatch(setProduce(sor));
    navigation.dispatch(StackActions.pop());
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Sort</Text>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.sort == "title"}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, sort: "title" };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Title</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.sort == "price1"}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, sort: "price1" };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}> Heighest price</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.sort == "price"}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, sort: "price" };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}> lowest price</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.sort == "quantity"}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, sort: "quantity" };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Popularity</Text>
        </View>
      </View>
      <View style={styles.container}>
        {/*//////////////////////////////////////////// category filter////////////////////////// */}
        <Text style={styles.header}>Category</Text>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.ALL}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, ALL: !pre.ALL };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>All</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.Supplements}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, Supplements: !pre.Supplements };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Supplements</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.Resistanceband}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, Resistanceband: !pre.Resistanceband };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Resistance Bands</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.proteinshakers}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, proteinshakers: !pre.proteinshakers };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>protein Shakers</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.Bags}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, Bags: !pre.Bags };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Bags</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.Weights}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, Weights: !pre.Weights };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Weights</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={search.Accessories}
            onValueChange={() => {
              setSearch((pre) => {
                return { ...pre, Accessories: !pre.Accessories };
              });
            }}
            color={"#222"}
          />
          <Text style={styles.paragraph}>Accessories</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Slider
            style={{ width: "70%", height: 40 }}
            minimumValue={0}
            maximumValue={2000}
            value={search.min}
            onValueChange={(value) => {
              setSearch((pre) => {
                return { ...pre, min: value };
              });
            }}
            step={25}
            minimumTrackTintColor="#222"
            maximumTrackTintColor="#ff5733"
            thumbTintColor="#ff5733"
          />
          <Text style={styles.paragraph}>Min : {search.min}</Text>
        </View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Slider
            style={{ width: "70%", height: 40 }}
            minimumValue={0}
            maximumValue={2000}
            value={search.max}
            onValueChange={(value) => {
              setSearch((pre) => {
                return { ...pre, max: value };
              });
            }}
            step={25}
            minimumTrackTintColor="#ff5733"
            maximumTrackTintColor="#000000"
            thumbTintColor="#222"
          />
          <Text style={styles.paragraph}>Max : {search.max}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.apply} onPress={searched}>
          <Text style={{ color: "#ff5733" }}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default DrawerEcom;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    color: "#fff",
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },

  header: {
    color: "#ff5733",
    fontSize: 30,
  },
  apply: {
    backgroundColor: "#222",
    width: 200,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#ff5733",
    borderWidth: 2,
  },
});
