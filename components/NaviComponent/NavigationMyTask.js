import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { taskManager } from "../../DAL/dal";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export const NavigationMyTask = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTasks}
          options={{
            title: "Мои дела",
            headerTitleStyle: {
              color: "white",
              fontSize: 30,
            },
            headerStyle: { backgroundColor: "#5576B7" },
            contentStyle: {
              backgroundColor: "#30343D",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyTasks = ({ navigation }) => {
  const [toDos, setToDos] = useState([]);
  useEffect(() => {
    taskManager.getMyTasks().then((r) => setToDos(r.reverse()));
  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <CreateToDo onSubmit={setToDos} />
        <FlatList
          style={styles.flat}
          data={toDos}
          renderItem={({ item }) => (
            <Task onSubmit={setToDos} key={item.id} body={item} />
          )}
        />
      </View>
    </View>
  );
};

const CreateToDo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const createNewToDo = (text) => {
    if (value) {
      const toDo = {
        taskId: Date.now().toString(),
        task: text,
      };
      taskManager.addTask(toDo.taskId, toDo.task);
      onSubmit((prev) => [toDo, ...prev]);
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          createNewToDo(value);
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
};

const Task = ({ body, onSubmit }) => {
  const deleteTask = (task, id) => {
    taskManager
      .deleteTask(id)
      .then((r) => onSubmit((prev) => prev.filter((el) => el.task != task)));
  };
  return (
    <View style={styles.component}>
      <Text
        onPress={() => {
          deleteTask(body.task, body.taskId);
        }}
        style={styles.deleteTask}
      >
        ✖
      </Text>
      <Text style={styles.text}>{body.task}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    backgroundColor: "#30343D",
    paddingHorizontal: 10,
  },
  flat: {
    marginTop: 15,
    height: "68%",
  },
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
  button: {
    backgroundColor: "#0C5AA6",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  component: {
    padding: 15,
    borderColor: "#5576B7",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    position: "relative",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  deleteTask: {
    position: "absolute",
    top: 2,
    right: 7,
    color: "#5576B7",
    fontSize: 18,
  },
});
