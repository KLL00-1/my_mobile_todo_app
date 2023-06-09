import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const Task = ({body, onSubmit}) => {
    const deleteTask = (title)=>{
        onSubmit(prev => prev.filter(el=> el.title != title))
    }
  return (
    <View style={styles.component}>
        <Text onPress={()=>{deleteTask(body.title)}} style={styles.deleteTask}>✖</Text>
      <Text style={styles.text}>{body.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    padding: 15,
    borderColor: "#5576B7",
    alignItems:'center',
    borderWidth: 1,
    marginTop:10,
    borderRadius: 10,
    position:'relative'
  },
  text:{
    color:'white',
    fontSize:18
  },
  deleteTask:{
    position:'absolute',
    top:2,
    right:7,
    color:'#5576B7',
    fontSize:18
  }
});
