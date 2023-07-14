import { AxiosInstance } from "../base";

const PDFApi = () => {
  const api = AxiosInstance("pdf-management");

  const retreive = async (id) => {
    const path = `pdfs/${id}`
    return api.get(path);
  };

  const list = async () => {
    console.log("list pdfs")
    return api.get("pdfs");
  };

  const create = async (data) => {
    return api.post("pdfs", data)
  }

  const members = async (id) => {
    return api.get(`pdfs/${id}/members`)
  }

  const member_add = async (data) => {
    return api.post(`pdf-members`, data)
  }

  const access_using_link = async (code) => {
    return api.post(`pdfs/d/${code}`)
  }

  const list_comments = async (id) => {
    return api.get(`pdfs/${id}/comments`)
  }

  const add_comment = async (data) => {
    return api.post("comments", data)
  }

  const add_reply = async (data) => {
    return api.post("replies", data)
  }

  const apis = {
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

  return apis;
};

export default PDFApi;
