import {
  bgImageDark,
  bgImageLight,
  BiLoaderCircle,
  FaCircleXmark,
  FaEye,
  Link,
  MessageError,
  MessageSuccess,
  notify,
  register,
  useFormik,
  useMemo,
  useNavigate,
  useState,
  useTheme,
  Yup,
} from "./index";
const Register = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  const registerSubmit = async (values) => {
    setIsLoading(true);
    try {
      const data = await register(values);
      if (data.success) {
        setSuccess(data.message);
        notify("success", "success");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  let phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = useMemo(() => {
    return Yup.object({
      name: Yup.string()
        .min(3, "Your Name Must be More than 3 characters")
        .max(10, "Your Name Must be less than 10 characters")
        .required("Name must be required"),
      email: Yup.string()
        .email("Enter a valid Email")
        .required("Email must be required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Enter an Egyptian Number")
        .required("Phone is required"),
      address: Yup.string().required("Address is required"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,40}$/,
          "Password must start with an uppercase letter and be more than 5 characters"
        )
        .required("Enter Your Password"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Confirm Password must be equal to Password"
        )
        .required("Confirm Password must be required"),
    });
  }, []);

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validate: () => {
      setError(null);
    },
    onSubmit: registerSubmit,
  });

  function displayEye() {
    setShow(!show);
  }

  return (
    <section className="register">
      <div
        className="container-xl"
        style={{
          backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row">
          <div className="col-md-3 register-left">
            <h3>Welcome</h3>
            <p>Start Your Journey Now!</p>
          </div>

          <div className="col-md-9 register-right">
            {error && <MessageError errorMes={error} />}
            {success && <MessageSuccess successMessage={success} />}
            <h2 className="ms-2 mb-3">Register</h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="item">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Name"
                />
                <i className="fa fa-user icon-input"></i>
                {formik.errors.name && formik.touched.name ? (
                  <span className="error">
                    <FaCircleXmark />
                    {formik.errors.name}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex gap-3 item-group justify-content-between">
                <div className="item">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Email"
                  />
                  <i className="fa-solid fa-at icon-input"></i>
                  {formik.errors.email && formik.touched.email ? (
                    <span className="error">
                      <FaCircleXmark />
                      {formik.errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                  {/* {!formik.errors.email && formik.touched.email ? (
                    <span className="is-valid text-success success">
                      <IoIosCheckmarkCircleOutline />
                      Your email is valid
                    </span>
                  ) : (
                    ""
                  )} */}
                </div>

                <div className="item">
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Phone"
                  />
                  <i className="fa-solid fa-phone icon-input"></i>
                  {formik.errors.phone && formik.touched.phone ? (
                    <span className="error">
                      <FaCircleXmark />
                      {formik.errors.phone}
                    </span>
                  ) : (
                    ""
                  )}
                  {/* {!formik.errors.phone && formik.touched.phone ? (
                    <span className="is-valid text-success success">
                      <IoIosCheckmarkCircleOutline />
                      Your phone number is valid
                    </span>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>

              <div className="d-flex gap-3 item-group justify-content-between">
                <div className="item position-relative">
                  <input
                    type={show ? "text" : "password"}
                    className="form-control"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Password"
                  />
                  <FaEye className="iconEye" onClick={displayEye} />

                  {formik.errors.password && formik.touched.password ? (
                    <span className="error">
                      <FaCircleXmark />
                      {formik.errors.password}
                    </span>
                  ) : (
                    ""
                  )}
                  {/* {!formik.errors.password && formik.touched.password ? (
                    <span className="is-valid text-success success">
                      <IoIosCheckmarkCircleOutline />
                      Your password is valid
                    </span>
                  ) : (
                    ""
                  )} */}
                </div>

                <div className="item position-relative">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Confirm Password"
                  />
                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword ? (
                    <span className="error">
                      <FaCircleXmark />
                      {formik.errors.confirmPassword}
                    </span>
                  ) : (
                    ""
                  )}
                  {/* {!formik.errors.confirmPassword &&
                  formik.touched.confirmPassword ? (
                    <span className="is-valid text-success success">
                      <IoIosCheckmarkCircleOutline />
                      Your confirm password is valid
                    </span>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>

              <div className="item">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Address"
                />
                <i className="fa-solid fa-location-dot icon-input"></i>
                {formik.errors.address && formik.touched.address ? (
                  <span className="error">
                    <FaCircleXmark />
                    {formik.errors.address}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Submit Button */}
              <button
                className="d-block mx-auto"
                disabled={!(formik.isValid && formik.dirty) || isLoading}
                type="submit"
              >
                {isLoading ? <BiLoaderCircle /> : "Register"}
              </button>
              <p className="mt-3 already text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
