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

const updateReview = ({ reportId: id, reviewId, ratings }) => {
  return http.put(
    `${apiEndPoint}/${id}`,
    { ratings },
    {
      params: {
        reviewId
      }
    }
  );
};

const updateReviewWithLink = (id, reviewId) => {
  const link = `${id}?reviewId=${reviewId}`;

  return http.put(
    `${apiEndPoint}/${id}`,
    { link },
    {
      params: {
        reviewId
      }
    }
  );
};

export default {
  getReview,
  updateReview,
  updateReviewWithLink
};
