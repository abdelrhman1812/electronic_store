const MessageError = ({ errorMes }) => {
  return (
    <>
      <small className="text-center d-block text-danger fs-5">{errorMes}</small>
    </>
  );
};

export default MessageError;
