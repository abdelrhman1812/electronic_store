import { toast } from "react-toastify";

const notify = (type, msg) => {
  toast[type](msg, {
    duration: 1000,
    position: "top-right",
  });
};

export default notify;
