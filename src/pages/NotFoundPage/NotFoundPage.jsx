import notFoundImage from "../../assets/Images/404_page-not-found.png";
const NotFoundPage = () => {
  return (
    <section className="not-found  d-flex flex-column justify-content-center align-items-center ">
      <img src={notFoundImage} className="w-100" alt="not found" />
    </section>
  );
};

export default NotFoundPage;
