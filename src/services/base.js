import axios from "axios";
import { getItemFromLocalStorage, removeAllItemFromLocalStorage } from "../utils/localStorageUtil";


export const AxiosInstance = (service) => {
  let baseURL = `https://sahil1109.pythonanywhere.com/api/${service}/`;

  // const router = useRouter()
  const token = getItemFromLocalStorage("token", "");

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
