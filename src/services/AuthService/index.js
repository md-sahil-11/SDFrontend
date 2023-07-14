import Api from "./api";

const AuthService = () => {
  const AuthApi = Api();

  const getUserService = () => {
    return new Promise((resolve, reject) => {
      AuthApi.getUser()
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            resolve(res);
          } else reject("Something went wrong!!!");
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  };

  const registerUserService = (data) => {
    return new Promise((resolve, reject) => {
      AuthApi.registerUser(data)
        .then((res) => {
          if (res.status == 201) {
            console.log(res.data);
            resolve(res);
          } else reject("Something went wrong!!!");
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  };

  const loginUserService = (data) => {
    return new Promise((resolve, reject) => {
      AuthApi.loginUser(data)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            resolve(res);
          } else reject("No Response");
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  };

  const logoutUserService = () => {
    return new Promise((resolve, reject) => {
      AuthApi.logoutUser()
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            resolve(res);
          } else reject("No Response");
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  };

  const send_reset_password_email = (data) => {
    return new Promise((resolve, reject) => {
      AuthApi.send_reset_password_email(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  const reset_password = (data) => {
    return new Promise((resolve, reject) => {
      AuthApi.reset_password(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };
  
  const verify_email = () => {
    return new Promise((resolve, reject) => {
      AuthApi.verify_email()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };
  
  const list = () => {
    return new Promise((resolve, reject) => {
      AuthApi.list()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  const services = {
    getUserService,
    registerUserService,
    loginUserService,
    logoutUserService,
    send_reset_password_email,
    reset_password,
    verify_email,
    list
  };

  return services;
};

export default AuthService;
