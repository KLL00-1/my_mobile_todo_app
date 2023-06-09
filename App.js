import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavBar } from "./components/NavBar";
import { CreateToDo } from "./components/CreateToDo";
import { Task } from "./components/Task";
import { useState } from "react";

export default function App() {

  const [toDos, setToDos]=useState([])
  return (
    <View style={styles.container}>
      <NavBar />
      <View style={{paddingHorizontal:10}}>
        <CreateToDo onSubmit={setToDos} />
        {toDos.map(toDo=> <Task onSubmit={setToDos} key={toDo.id} body={toDo}/>)}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#30343D",
  },
});
