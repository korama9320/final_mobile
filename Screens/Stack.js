import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tab } from "@rneui/base";
import TabUser from "./TabUser";

function UserStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="UserStack" component={TabUser}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default UserStack;
