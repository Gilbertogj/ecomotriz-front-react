import { toast } from "react-toastify";

export const NetworkStatusNotification = (isOnline, message) => {
  if (isOnline) {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
};
