import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://192.168.1.107:5000/",
});
instance.interceptors.request.use(async (config) => {
  config.headers.Authorization = await AsyncStorage.getItem("@token");
  return config;
});

export const taskManager = {
  getMyTasks: () => instance.get("get-all-tasks").then((res) => res.data),
  addTask: (id, taks) =>
    instance
      .post("add-new-task", { taskId: id, task: taks })
      .then((res) => res.data),
  deleteTask: (id) =>
    instance.post("delete-task", { taskId: id }).then((res) => res.data),
};
export const userManager = {
  signInUser: (userName, password) =>
    instance
      .post("sign-in", { userName: userName, password: password })
      .then((response) => response.data),
  getMe: () => instance.get("auth-me").then((response) => response.data),
  login: (userName, password) =>
    instance
      .post("login", { userName: userName, password: password })
      .then((response) => response.data),
};
export const messageManager = {
  getMessage: (id) =>
    instance.get(`message/${id}`).then((response) => response.data),
};
