import "../../../assets/style/shared.css";

const NewsLetter = () => {
  return (
    <section className="newsletter-section container-xl overflow-hidden">
      <div className="row">
        <div className="col-md-4">
          <h2>
            Our <span>Newsletter</span>
          </h2>
          <p>Get updates by subscribe our weekly newsletter</p>
        </div>

        <div className="col-md-8 d-flex  align-items-center">
          <div className="input-group justify-content-center ">
            <input type="email" className="" placeholder="Enter your email " />
            <button>Subscribe </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
