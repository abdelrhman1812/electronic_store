import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../assets/style/checkout.css";
import InputMessageError from "../../components/shared/InputMessageError/InputMessageError";
import { useCartContext } from "../../context/CartContext";
import notify from "../../lib/notify";
import customMessages from "../../lib/validationMessages";
import { checkoutCash } from "../../services/Apis/checkout/checkout";
const CheckoutCashPage = () => {
  const { cartId, setCartLength, setCart } = useCartContext();
  const navigate = useNavigate();
  const checkout = async (values) => {
    const shoppingAddress = values;
    try {
      const data = await checkoutCash(cartId, shoppingAddress);
      if (data?.success) {
        navigate("/profile");
        notify("success", data.message);
        setCart([]);
        setCartLength(0);
      }
    } catch (error) {
      notify("error", error.response.data.message);
      navigate("/cart");
    }
  };

  /* ========== Validation ========== */

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    city: Yup.string()
      .min(3, customMessages("City", 3)["string.min"])
      .max(10, customMessages("City", 10)["string.max"])
      .required(customMessages("City")["any.required"]),

    street: Yup.string()
      .min(3, customMessages("Street", 3)["string.min"])
      .max(10, customMessages("Street", 10)["string.max"])
      .required(customMessages("Street")["any.required"]),

    phone: Yup.string()
      .matches(phoneRegExp, "Enter a valid Egyptian phone number")
      .required(customMessages("Phone")["any.required"]),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      street: "",
      phone: "",
    },
    validationSchema,
    onSubmit: checkout,
  });

  return (
    <>
      <Helmet>
        <title>Checkout - Cash</title>
      </Helmet>
      <main className="checkout-cash d-flex justify-content-center align-items-center py-5">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3 p-4"
        >
          <h2 className="text-center">Checkout</h2>

          {/* City Field */}
          <input
            type="text"
            name="city"
            placeholder="City Address"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <InputMessageError message={formik.errors.city} />
          ) : null}

          {/* Street Field */}
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.street && formik.errors.street ? (
            <InputMessageError message={formik.errors.street} />
          ) : null}

          {/* Phone Field */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <InputMessageError message={formik.errors.phone} />
          ) : null}

          {/* Submit Button */}
          <button disabled={!(formik.isValid && formik.dirty)} type="submit">
            Pay Now
          </button>
        </form>
      </main>
    </>
  );
};

export default CheckoutCashPage;
