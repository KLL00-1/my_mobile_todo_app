import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const NavBar = () => {
  return (
    <View style={styles.navi}>
      <Text style={styles.text}>Мои дела</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navi: {
    height: 80,
    backgroundColor:'#5576B7',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius:15,
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:10
  },
  text: {
    color:'#fff',
    fontSize:20
  },
});
