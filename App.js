import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { NavigationMyTask } from "./components/NaviComponent/NavigationMyTask";
import { Footer } from "./components/Footer";
import { NavigationFamilyChat } from "./components/NaviComponent/NavigationFamilyChat";
import { NavigationOther } from "./components/NaviComponent/NavigationOther";
import { Provider, useSelector } from "react-redux";
import store from "./Redux/ReduxStore";
import { LoginOrSignIn } from "./components/loginOrSignIn";
export default function App() {
  const [mainNavi, setMainNavi] = useState("Семейный чат");
  const [login, setLogin] = useState(store.getState().user.login);

  return (
    <Provider store={store}>
      {!login ? (
        <LoginOrSignIn setLogin={setLogin} />
      ) : (
        <View style={styles.container}>
          {mainNavi === "Мои дела" ? (
            <NavigationMyTask />
          ) : mainNavi === "Семейный чат" ? (
            <NavigationFamilyChat />
          ) : mainNavi === "Что то еще" ? (
            <NavigationOther />
          ) : (
            <></>
          )}
          <Footer setMainNavi={setMainNavi} mainNavi={mainNavi} />
          <StatusBar style="auto" />
        </View>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#30343D",
  },
});
