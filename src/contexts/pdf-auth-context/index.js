import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthService from "../../services/AuthService";
import PdfService from "../../services/PdfService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import PropTypes from 'prop-types';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const service = AuthService();
  const pdfService = PdfService();
  const pathname = usePathname();
  //   const navigate = useNavigate();
  //   const location = useLocation();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [pdf, setPdf] = useState({});
  const [pdfs, setPdfs] = useState([]);
  const [comments, setComments] = useState([]);
  const [members, setMembers] = useState([]);
  const [token, setToken] = useLocalStorage("token", "");
  const [loading, setLoading] = useState(true);

  // helper function
  const loadDataHelper = (data) => {
    setUser(data);
    setToken(data["token"]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (user === null && token && token !== "") {
      getUser();
    }
    setLoading(false);
    return () => setLoading(true);
  }, [children]);

  const getUser = async () => {
    try {
      const res = await service.getUserService();
      console.log(res.data);
      setUser(res.data);
    } catch (err) {}
  };

  const auth_guard = () => {
    if (token === "" && !user) router.replace("/pdf-help/auth/login");
  };

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const res = await service.registerUserService(data);
      console.log(res.data);
      loadDataHelper(res.data.data);
      router.replace("/pdf-help")
      toast.success("Sign up successful!");
    } catch (err) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    setLoading(true);
    try {
      const res = await service.loginUserService(data);
      loadDataHelper(res.data.data);
      router.replace("/pdf-help")
      toast.success("Sign in successful!");
    } catch (err) {
      toast.error("Invalid password or email!");
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    const res = await service.logoutUserService();
    setUser(null);
    setToken("");
    setLoading(false);
    router.push("/pdf-help/auth/login");
  };

  const send_reset_password_email = async (data) => {
    try {
      const res = await service.send_reset_password_email(data);
      toast.info("Reset password email sent.");
      return true;
    } catch (err) {
      return false;
    }
  };

  const reset_password = async (data) => {
    try {
      const res = await service.reset_password(data);
      return true;
    } catch (err) {
      return false;
    }
  };

  const verify_email = async () => {
    try {
      const res = await service.verify_email();
      return true;
    } catch (err) {
      return false;
    }
  };

  const userList = async () => {
    try {
      const res = await service.list();
      setUsers(res.data.results || []);
    } catch (err) {}
  };

  const pdf_list = async () => {
    try {
      const res = await pdfService.list();
      setPdfs(res.data.results || []);
    } catch (err) {}
  };

  const pdf_add = async (data) => {
    try {
      const res = await pdfService.create(data)
      return true
    } catch (err) {return false}
  }

  const pdf_retrieve = async (id) => {
    try {
      const res = await pdfService.retreive(id)
      setPdf(res.data || {})
    } catch (err) {setPdf({})}
  }

  const pdf_members = async (id) => {
    try {
      const res = await pdfService.members(id)
      setMembers(res.data || [])
    } catch (err) {setMembers([])}
  }

  const member_add = async (data) => {
    try {
      const res = await pdfService.member_add(data)
      return true
    } catch (err) {
      toast.error(err.message)
      return false
    }
  }

  const list_comments = async (id) => {
    try {
      const res = await pdfService.list_comments(id);
      setComments(res.data || [])
    } catch (err) {setComments([])}
  }

  const add_comment = async (data) => {
    try {
      const res = await pdfService.add_comment(data)
      return true
    } catch (err) {return false}
  }

  const add_reply = async (data) => {
    try {
      const res = await pdfService.add_reply(data)
      return true
    } catch (err) {return false}
  }

  const access_using_link = async (data) => {
    try {
      const res = await pdfService.access_using_link(data)
      loadDataHelper(res.data)
      return true
    } catch (err) {return false}
  }

  const pdf_file = async (id) => {
    try {
      const res = await pdfService.pdf_file(id)
      return res
    } catch (err) {return err}
  }

  let authContextData = {
    user,
    users,
    router,
    loading,
    token,
    setLoading,
    toast,
    pathname,
    getUser,
    registerUser,
    loginUser,
    logoutUser,
    send_reset_password_email,
    verify_email,
    reset_password,
    userList,
    auth_guard,
    pdf_list,
    pdfs,
    pdf,
    pdf_add,
    pdf_retrieve,
    members,
    pdf_members,
    member_add,
    list_comments,
    comments,
    add_comment,
    add_reply,
    access_using_link,
    pdf_file
  };

  return (
    <AuthContext.Provider value={authContextData}>
      <>
        {!loading ? children : <>Loading</>}
        <ToastContainer />
      </>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const usePdfAuthContext = () => useContext(AuthContext);
