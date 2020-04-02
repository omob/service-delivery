import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/reviews";

const getReview = (id, reviewId) => {
  return http.get(`${apiEndPoint}/${id}`, {
    params: {
      reviewId
    }
  });
};

export default {
  getReview
};
