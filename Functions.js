import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@token", value);
  } catch (e) {
    console.log(e);
  }
};
export const getData = async (getItem) => {
  try {
    const value = await AsyncStorage.getItem("@token");
    getItem(value);
  } catch (e) {
    console.log(e);
  }
};
export const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};
