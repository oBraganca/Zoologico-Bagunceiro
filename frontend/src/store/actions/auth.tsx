import { AUTHENTICATED, NOT_AUTHENTICATED } from './actionsType'

import { useDispatch } from "react-redux";
import { Dispatch } from 'redux';  

const dispatch = useDispatch();

const setToken = (token: string) => {
    localStorage.setItem("token", token);
    // localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};
  
export const getToken = () => {
    // const now = new Date(Date.now()).getTime();
    // const timeAllowed = 1000 * 60 * 30;
    // const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime")?.getTime();
    // if (timeSinceLastLogin < timeAllowed) {
    return localStorage.getItem("token");
    // }
};

const deleteToken = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("lastLoginTime");
}
