import { FaCircleXmark } from "react-icons/fa6";

const InputMessageError = ({ message }) => {
  return (
    <span className="text-danger d-flex align-items-center justify-content-center gap-2">
      <FaCircleXmark />
      {message}
    </span>
  );
};

export default InputMessageError;
