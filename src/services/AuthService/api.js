import { AxiosInstance } from "../base";

const AuthApi = () => {
  const api = AxiosInstance("users")

  const getUser = async () => {
    console.log("======Get user======");
    const path = "account/get-user"
    return api.get(path);
  };

  const registerUser = async (data) => {
    console.log("======Register/Sign-up new user======");
    return api.post("account/register", data);
  };

  const loginUser = async (data) => {
    console.log("======Login user======");
    return api.post("account/login", data);
  };

  const logoutUser = async () => {
    console.log("======Logout user======");
    return api.post("account/logout");
  };

  const send_reset_password_email = async (data) => {
    return api.post("account/reset-password-email", data)
  }

  const reset_password = async (data) => {
    return api.put("account/reset-password", data)
  }

  const verify_email = async () => {
    return api.put("account/verify-email")
  }

  const list = async () => {
    return api.get("account")
  }

  const apis = {
    getUser,
    registerUser,
    loginUser,
    logoutUser,
    send_reset_password_email,
    reset_password,
    verify_email,
    list
  };

  return apis;
};

export default AuthApi;
