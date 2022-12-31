import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouriteScreen from "./screens/FavouriteScreen";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import NewsDetails from "./screens/NewsDetails";
import NewsScreen from "./screens/NewsScreen";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Haberler"
        component={NewsScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="newspaper-o" size={30} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorilerim"
        component={FavouriteScreen}
        options={{
          tabBarIcon: () => <Entypo name="star" size={30} color="#E0BD3C" />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
};

export default function App(props) {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ title: "HABER AKIŞI UYGULAMASI" }}>
        <MainStack.Screen name="TabNavigator" component={TabNavigator} />
        <MainStack.Screen name="StackNavigator" component={StackNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

//       <Text style={styles.header}>HABER AKIŞI UYGULAMASI</Text>

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
});
