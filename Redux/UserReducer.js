const SET_LOGIN = "SET_LOGIN";
const SET_USER_NAME = "SET_USER_NAME";

let initialState = {
  login: false,
  userName: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: true,
      };
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
};

export const setLoginAction = () => {
  return { type: SET_LOGIN };
};
export const setUserNameAction = (userName) => {
  return { type: SET_USER_NAME, userName };
};

export default userReducer;
