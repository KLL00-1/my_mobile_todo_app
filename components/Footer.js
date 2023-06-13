import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const Footer = ({ setMainNavi, mainNavi }) => {
  return (
    <View style={styles.navi}>
      <TouchableOpacity
        style={mainNavi === "Мои дела" && styles.back}
        onPress={() => {
          setMainNavi("Мои дела");
        }}
      >
        <Text style={styles.naviText}>Мои дела</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={mainNavi === "Семейный чат" && styles.back}
        onPress={() => {
          setMainNavi("Семейный чат");
        }}
      >
        <Text style={styles.naviText}>Семейный чат</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={mainNavi === "Что то еще" && styles.back}
        onPress={() => {
          setMainNavi("Что то еще");
        }}
      >
        <Text style={styles.naviText}>Что то еще</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navi: {
    backgroundColor: "#5576B7",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
  },
  naviText: {
    marginHorizontal: 10,
    color: "white",
    padding: 10,
  },
  back: {
    backgroundColor: "#30343D",
    borderRadius: 15,
    color: "white",
  },
});
