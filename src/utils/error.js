import { toast } from "react-toastify";
import { handleLogout } from "./logout";
import { get } from "./lodash";

export const handleError = (error) => {
  const errorMsg = get(error, "data.message") || get(error, "data.error");
  if (errorMsg) {
    toast.error(errorMsg);
  }

  if (error.status === 417) handleLogout(errorMsg);
};
