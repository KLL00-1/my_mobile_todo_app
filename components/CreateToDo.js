import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Alert } from "react-native";

export const CreateToDo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const createNewToDo = (text) => {
    if (value) {
      const toDo = {
        id: Date.now().toString(),
        title: text,
      };
      onSubmit((prev) => [...prev, toDo]);
      setValue("");
    } else {
      Alert.alert("Нужно указать название дела!");
    }
  };
  return (
    <View style={styles.toDoContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={setValue}
        value={value}
        placeholderTextColor={"#7189B7"}
        placeholder="Название нового дела"
      />

      <Button
        onPress={() => {
          createNewToDo(value);
        }}
        color="#0C5AA6"
        title="Добавить"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toDoContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    width: "65%",
    borderBottomWidth: 2,
    borderBottomColor: "#5576B7",
    padding: 10,
    color: "white",
  },
});
