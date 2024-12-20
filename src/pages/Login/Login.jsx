import {
  bgImageDark,
  bgImageLight,
  BiLoaderCircle,
  FaCircleXmark,
  FaEye,
  IoIosCheckmarkCircleOutline,
  Link,
  login,
  MessageError,
  MessageSuccess,
  notify,
  useCartContext,
  useFormik,
  useMemo,
  useNavigate,
  useState,
  useTheme,
  useUserContext,
  useWishListContext,
  Yup,
} from "./index";

const Login = () => {
  const { isDark } = useTheme();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getUser } = useUserContext();
  const { getUserCart } = useCartContext();
  const { getUserWishlist } = useWishListContext();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  /* ========== Login Submit ========== */
  const loginSubmit = async (values) => {
    setIsLoading(true);

    try {
      const data = await login(values);
      console.log(data.user.role);

      getUser();
      getUserCart();
      getUserWishlist();
      setSuccess(data.message);
      setError(null);
      if (data.success) {
        if (data.user.role === "admin") {
          navigate("/admin");
          notify("success", "Success");
        } else {
          navigate("/");
          notify("success", "Success");
        }
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Validation ========== */
  let validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .email("Enter a valid Email")
        .required("Email must be required"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,40}$/,
          "Password must start with an uppercase letter and be more than 5 characters"
        )
        .required("Enter Your Password"),
    });
  }, []);

  /* ========== Formik || Catch Value || Send Data ========== */
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validate: function () {
      setError(null);
    },
    onSubmit: loginSubmit,
  });

  /* ========== Display Eye ========== */
  function displayEye() {
    setShow(!show);
  }

  return (
    <section className="register login">
      <div
        className="container-xl"
        style={{
          backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row">
          {/* left */}
          <div className="col-md-9 register-right">
            {error && <MessageError errorMes={error} />}
            {success && <MessageSuccess successMessage={success} />}
            <h2 className="ms-2 mb-3">Login</h2>

            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
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
                {!formik.errors.email && formik.touched.email ? (
                  <span className="is-valid text-success success">
                    <IoIosCheckmarkCircleOutline />
                    Your email is valid
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Password */}
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
                {!formik.errors.password && formik.touched.password ? (
                  <span className="is-valid text-success success">
                    <IoIosCheckmarkCircleOutline />
                    Your password is valid
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Btn */}
              <button
                disabled={!(formik.isValid && formik.dirty) || isLoading}
                type="submit"
              >
                {isLoading ? <BiLoaderCircle /> : "Login"}
              </button>
            </form>
            <p className="text-center already mt-3">
              Don’t have an account?
              <Link to="/register" className="mx-1 ">
                Register
              </Link>
            </p>
          </div>

          {/* Right */}
          <div className="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Welcome</h3>
            <p>
              Welcome! Please enter your credentials to access your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
