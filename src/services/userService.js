import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

function register({ email, password, firstName, lastName, companyName }) {
  return http.post(apiEndPoint, {
    email,
    password,
    firstName,
    lastName,
    companyName
  });
}

export default {
  register
};
