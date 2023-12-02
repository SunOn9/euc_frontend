import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum ToastType {
  ERROR = 1,
  SUCCESS = 2,
  WARN = 3,
  WARNNING = 4,
}

export const customToast = (title: string, type: ToastType) => {
  switch (type) {
    case ToastType.ERROR: {
      toast.error(`${title}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        style: {
          borderRadius: "1rem",
        },
      });
      break;
    }
    case ToastType.SUCCESS: {
      toast.success(`${title}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        style: {
          borderRadius: "1rem",
        },
      });
      break;
    }
    case ToastType.WARN: {
      toast.warn(`${title}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        style: {
          borderRadius: "1rem",
        },
      });
      break;
    }
    case ToastType.WARNNING: {
      toast.warning(`${title}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        style: {
          borderRadius: "1rem",
        },
      });
      break;
    }
    default: {
      break;
    }
  }
};
