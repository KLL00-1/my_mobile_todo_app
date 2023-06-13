import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import home from "../Images/anime_fone.gif";
import homeRegister from "../Images/anime_register_fone.gif";
import { useDispatch } from "react-redux";
import { setLoginAction, setUserNameAction } from "../Redux/UserReducer";
import { userManager } from "../DAL/dal";
import { getData, remove, storeData } from "../Functions";

export const LoginOrSignIn = ({ setLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatUserPassord, setRepeatUserPassword] = useState("");
  const [data, setData] = useState();
  const dispatch = useDispatch();
  // remove("@token");
  useEffect(() => {
    getData(setData);
    if (data) {
      userManager.getMe().then((r) => {
        if (r.userName) {
          dispatch(setUserNameAction(r.userName));
          dispatch(setLoginAction());
          setLogin(true);
        }
      });
    }
  }, [data]);
  return (
    <>
      {isSignIn ? (
        <View style={styles.container}>
          <Image
            source={home}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS == "ios" ? 90 : 1}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View>
              <Text style={{ color: "white", fontSize: 18 }}>
                Войдите в систему
              </Text>

              <TextInput
                placeholderTextColor={"#fff"}
                placeholder="Имя"
                style={styles.inputs}
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                placeholderTextColor={"#fff"}
                placeholder="Пароль"
                style={styles.inputs}
                value={userPassword}
                onChangeText={setUserPassword}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={
                    userName && userPassword
                      ? styles.loginButton
                      : styles.loginButtonDisabled
                  }
                  onPress={() => {
                    if (userName && userPassword) {
                      userManager.login(userName, userPassword).then((r) => {
                        if (r.userName) {
                          storeData(r.token);
                          dispatch(setUserNameAction(r.userName));
                          dispatch(setLoginAction());
                          setLogin(true);
                        } else {
                          console.log(r);
                        }
                      });
                    }
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignIn(false)}>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    Регистрация?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            source={homeRegister}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS == "ios" ? 90 : 1}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.registerContainer}>
              <Text style={{ color: "white", fontSize: 17 }}>
                Заполните форму регистрации
              </Text>
              <TextInput
                placeholderTextColor={"#fff"}
                placeholder="Ваше имя"
                style={styles.inputs}
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                placeholderTextColor={"#fff"}
                placeholder="Пароль"
                style={styles.inputs}
                value={userPassword}
                onChangeText={setUserPassword}
              />
              <TextInput
                placeholderTextColor={"#fff"}
                placeholder="Пароль еще раз"
                style={styles.inputs}
                value={repeatUserPassord}
                onChangeText={setRepeatUserPassword}
              />
              <View
                style={{
                  alignSelf: "flex-start",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 30,
                }}
              >
                <TouchableOpacity
                  style={
                    userName &&
                    userPassword &&
                    repeatUserPassord &&
                    userPassword === repeatUserPassord
                      ? styles.loginButton
                      : styles.loginButtonDisabled
                  }
                  onPress={() => {
                    if (
                      userName &&
                      userPassword &&
                      repeatUserPassord &&
                      userPassword === repeatUserPassord
                    ) {
                      userManager
                        .signInUser(userName, userPassword)
                        .then((r) => {
                          if (r.userName) {
                            storeData(r.token);
                            dispatch(setUserNameAction(r.userName));
                            dispatch(setLoginAction());
                            setLogin(true);
                          }
                        })
                        .catch((e) => console.log(e));
                    }
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Регистрация
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignIn(true)}>
                  <Text style={{ color: "white" }}>Войти в систему?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    borderWidth: 1,
    width: 250,
    marginTop: 15,
    color: "white",
    borderColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 18,
    borderRadius: 10,
  },
  loginButtonDisabled: {
    opacity: 0.4,
    backgroundColor: "#A19696",
    alignItems: "center",
    paddingHorizontal: 10,
    maxWidth: "60%",
    paddingVertical: 5,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: "#3A7FE6",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: "60%",
  },
  registerContainer: {
    alignItems: "center",
  },
});
