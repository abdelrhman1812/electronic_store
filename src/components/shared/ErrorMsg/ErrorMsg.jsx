import "../../../assets/style/shared.css";

const ErrorMsg = ({ error }) => {
  return (
    <>
      <section className="pt-5">
        <p className="error-msg ">{error}</p>
      </section>
    </>
  );
};

export default ErrorMsg;
