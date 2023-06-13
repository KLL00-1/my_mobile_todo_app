import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import InvertedFlatList from "react-native-inverted-flat-list";
import Socket from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
import mafia from "../../Images/mafia.jpg";
import { useSelector } from "react-redux";
import { messageManager } from "../../DAL/dal";
const Stack = createNativeStackNavigator();

export const NavigationFamilyChat = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainChat"
          component={MainChat}
          options={{
            title: "Мой чат",
            headerTitleStyle: { color: "white", fontSize: 30 },
            headerStyle: { backgroundColor: "#5576B7" },
            contentStyle: { backgroundColor: "#30343D" },
          }}
        />
        <Stack.Screen
          name="CurrentChat"
          component={CurrentChat}
          options={{
            title: "Семейный чат",
            headerTitleStyle: { color: "white", fontSize: 30 },
            headerStyle: { backgroundColor: "#5576B7" },
            contentStyle: { backgroundColor: "#30343D" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainChat = ({ navigation }) => {
  return (
    <View style={styles.mainChatWrapper}>
      <OneChat navigation={navigation} />
    </View>
  );
};

const OneChat = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CurrentChat");
      }}
    >
      <View style={styles.oneChatStyle}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 50 }}
          source={mafia}
        />
        <Text style={{ color: "#7189B7", fontSize: 18 }}>Семейный чат</Text>
      </View>
    </TouchableOpacity>
  );
};
const CurrentChat = ({}) => {
  const connection = useMemo(
    () => Socket.connect("http://192.168.1.107:5000"),
    []
  );
  const { userName } = useSelector((state) => state.user);
  const [messageRequestCount, setMessageRequestCount] = useState(10);
  useEffect(() => {
    connection.on("connect", () => {
      connection.emit("connection", userName);
    });
  }, []);
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const screenHeight = Dimensions.get("window").height;
  const getChatMessage = (count) => {
    setIsLoading(true);
    messageManager
      .getMessage(count)
      .then((r) => setAllMessage(r))
      .catch((e) => Alert.alert("Ошибка сети"))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getChatMessage(messageRequestCount);
  }, []);
  useEffect(() => {
    connection.on("response", (data) => {
      setAllMessage((prev) => [data, ...prev]);
    });
  }, []);
  const sendNewMessage = (message) => {
    const newMessage = {
      from: userName,
      message: message,
    };
    connection.emit("message", newMessage);
    setMessage("");
  };
  return (
    <View style={styles.currentChat}>
      {isLoading && <ActivityIndicator />}
      <InvertedFlatList
        onPullToRefresh={() => {
          setMessageRequestCount((prev) => prev + 10);
          getChatMessage(messageRequestCount + 10);
        }}
        keyExtractor={(item) => item._id}
        refreshing={isLoading}
        style={styles.messageList}
        data={allMessage}
        renderItem={({ item }) => (
          <PersonalMessage
            key={item._id}
            userName={userName}
            message={item.message}
            from={item.from}
          />
        )}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == "ios" ? 90 : 1}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.senderMessageComponent}>
          <TextInput
            onChangeText={setMessage}
            value={message}
            style={styles.currentChatTextInput}
          />

          <TouchableOpacity
            onPress={() => {
              sendNewMessage(message);
            }}
          >
            <Text style={styles.sendButton}>⟫</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const PersonalMessage = ({ message, from, userName }) => {
  return (
    <View
      style={
        from == userName
          ? styles.wrapperMessageFromMi
          : styles.wrapperMessageFromOther
      }
    >
      <Text style={styles.currentFrom}>{from === userName ? "Я" : from}</Text>
      <Text style={styles.currentMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainChatWrapper: {
    flex: 0.9,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  oneChatStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  currentChat: {
    flex: 0.9,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  senderMessageComponent: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  currentChatTextInput: {
    fontSize: 22,
    color: "white",
    borderWidth: 1,
    borderColor: "#7189B7",
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },
  sendButton: {
    color: "white",
    fontSize: 22,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderColor: "#7189B7",
    borderRadius: 10,
  },
  messageList: {},
  wrapperMessageFromMi: {
    marginVertical: 5,
    maxWidth: "48%",
    borderWidth: 1,
    paddingVertical: 2,
    borderColor: "#7189B7",
    borderRadius: 10,
    paddingRight: 5,
    paddingLeft: 15,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(25, 11, 116, 0.7)",
  },
  wrapperMessageFromOther: {
    marginVertical: 5,
    maxWidth: "48%",
    borderWidth: 1,
    paddingVertical: 2,
    borderColor: "#7189B7",
    borderRadius: 10,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    paddingRight: 15,
    paddingLeft: 5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  currentMessage: {
    color: "white",
    fontSize: 17,
    paddingVertical: 5,
  },
  currentFrom: {
    color: "white",
    fontSize: 12,
    paddingVertical: 2,
  },
});
