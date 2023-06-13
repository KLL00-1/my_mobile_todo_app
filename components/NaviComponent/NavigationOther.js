import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export const NavigationOther = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Other"
          component={Other}
          options={{
            title: "Что то еще",
            headerTitleStyle: { color: "white", fontSize: 30 },
            headerStyle: { backgroundColor: "#5576B7" },
            contentStyle: { backgroundColor: "#30343D" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Other = () => {
  return (
    <View style={styles.mainChatWrapper}>
      <Text style={{ color: "white" }}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainChatWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
