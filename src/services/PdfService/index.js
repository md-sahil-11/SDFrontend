import Api from "./api";

const PDFService = () => {
  const PDFApi = Api();

  const retreive = (id) => {
    return new Promise((resolve, reject) => {
      PDFApi.retreive(id)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const list = () => {
    return new Promise((resolve, reject) => {
      PDFApi.list()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };
  
  const create = (data) => {
    return new Promise((resolve, reject) => {
      PDFApi.create(data)
        .then((res) => resolve(true))
        .catch((err) => reject(false));
    });
  };

  const members = (id) => {
    return new Promise((resolve, reject) => {
      PDFApi.members(id)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  const member_add = (data) => {
    return new Promise((resolve, reject) => {
      PDFApi.member_add(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  
  const access_using_link = (data) => {
    return new Promise((resolve, reject) => {
      PDFApi.access_using_link(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  
  const list_comments = (id) => {
    return new Promise((resolve, reject) => {
      PDFApi.list_comments(id)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  const add_comment = (data) => {
    return new Promise((resolve, reject) => {
      PDFApi.add_comment(data)
        .then((res) => resolve(true))
        .catch((err) => reject(false));
    });
  };
  
  const add_reply = (data) => {
    return new Promise((resolve, reject) => {
      PDFApi.add_reply(data)
        .then((res) => resolve(true))
        .catch((err) => reject(false));
    });
  };

  const services = {
    retreive,
    list,
    create,
    members,
    member_add,
    access_using_link,
    list_comments,
    add_comment,
    add_reply
  };

  return services;
};

export default PDFService;
