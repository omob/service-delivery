import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/staffs";

function register({ firstName, lastName, role }) {
  return http.post(apiEndPoint, {
    firstName,
    lastName,
    role
  });
}

const getStaffs = () => {
  return http.get(apiEndPoint);
};

const getStaff = staffId => {
  return http.get(`${apiEndPoint}/${staffId}`);
};

const addStaffReview = data => {
  return http.post(`${apiEndPoint}/reviews`, data);
};

export default {
  register,
  getStaffs,
  getStaff,
  addStaffReview
};
