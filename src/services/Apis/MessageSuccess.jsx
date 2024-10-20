const MessageSuccess = ({ successMessage }) => {
  return (
    <>
      <small className="text-center d-block text-success fs-5">
        {successMessage}
      </small>
    </>
  );
};

export default MessageSuccess;
