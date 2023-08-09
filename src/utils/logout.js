import T from "T";
import { toast } from "react-toastify";
import { loginStore } from "slices/loginSlice";
import { store } from "providers/store";

export const handleLogout = (msg = T.LOGOUT_SUCCESS) => {
  setTimeout(() => store.dispatch(loginStore({ token: "", user: {} })));
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/app/login";
  toast.success(msg);
};
