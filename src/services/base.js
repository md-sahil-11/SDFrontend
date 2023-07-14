import axios from "axios";
import { getItemFromLocalStorage, removeAllItemFromLocalStorage } from "../utils/localStorageUtil";
// import { useNavigate } from "react-router-dom";
// import routes from "../routes";
// import { useRouter } from 'next/navigation'


export const AxiosInstance = (service) => {
  let baseURL = `http://127.0.0.1:8000/api/${service}/`;
  // if (window.location.hostname && window.location.hostname !== 'localhost')
    // baseURL = `https://sahil11.pythonanywhere.com/api/${service}/`

  // const router = useRouter()
  const token = getItemFromLocalStorage("token", "");
  console.log("request", token)

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: token ? "Token " + token : null,
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    },
  });

  return axiosInstance;
};
