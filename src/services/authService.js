import http from "./httpServices";
import JwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getToken());

export async function login(email, password) {
  const { data: jwt } = await http.post(`${apiEndPoint}`, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (error) {}
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getToken
};
