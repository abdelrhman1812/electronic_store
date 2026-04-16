import { BiEnvelope, BiMap, BiPhoneCall, BiSend } from "react-icons/bi";
import "../../assets/style/contact.css";
import PageHeader from "../../components/shared/PageHeader/PageHeader";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
    alert("Message sent successfully!");
  };

  return (
    <section className="contact-us">
      <PageHeader title="Contact Us" />

      <div className="container-xl py-5 mt-4">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="contact-info h-100 p-4 p-md-5 rounded-4 shadow-sm">
              <h2 className="fw-bold mb-3">Get in Touch</h2>
              <p className="text-muted mb-5">
                Have questions or feedback? We'd love to hear from you. Reach
                out to us through any of the channels below.
              </p>

              <div className="info-cards d-flex flex-column gap-4">
                <div className="info-card d-flex align-items-center gap-4 p-3 rounded-3 transition-all">
                  <div
                    className="icon-wrapper d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle"
                    style={{ width: "60px", height: "60px", flexShrink: 0 }}
                  >
                    <BiMap size={30} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold">Our Location</h5>
                    <p className="text-muted mb-0">Masoura, Egypt</p>
                  </div>
                </div>

                <div className="info-card d-flex align-items-center gap-4 p-3 rounded-3 transition-all">
                  <div
                    className="icon-wrapper d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle"
                    style={{ width: "60px", height: "60px", flexShrink: 0 }}
                  >
                    <BiPhoneCall size={30} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold">Phone Number</h5>
                    <p className="text-muted mb-0">01008034761</p>
                  </div>
                </div>

                <div className="info-card d-flex align-items-center gap-4 p-3 rounded-3 transition-all">
                  <div
                    className="icon-wrapper d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle"
                    style={{ width: "60px", height: "60px", flexShrink: 0 }}
                  >
                    <BiEnvelope size={30} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold">Email Address</h5>
                    <p className="text-muted mb-0">
                      abdelrhmanali1812@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="contact-form-wrapper p-4 p-md-5 rounded-4 shadow-sm h-100">
              <h2 className="fw-bold mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label ms-1">Full Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2 px-3"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label ms-1">Email Address</label>
                    <input
                      type="email"
                      className="form-control rounded-3 py-2 px-3"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label ms-1">Subject</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2 px-3"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label ms-1">Message</label>
                    <textarea
                      className="form-control rounded-3 py-2 px-3"
                      rows="5"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-3 px-5 rounded-pill fw-bold shadow-sm transition-all w-100 w-md-auto"
                  >
                    <BiSend size={20} />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
