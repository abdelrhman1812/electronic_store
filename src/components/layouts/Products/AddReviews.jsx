import { useFormik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import notify from "../../../lib/notify";
import { addReviews } from "../../../services/Apis/reviewsApi/reviewsApi";
import StarRating from "./StarRating";

const AddReviews = ({ productId, refreshProduct }) => {
  const handelAddReviews = async (values) => {
    try {
      const data = await addReviews(values, productId);
      console.log(data);
      refreshProduct();
      notify("success", "Reviews added successfully");
    } catch (error) {
      if (error.response?.data?.message == "Your are already reviewed") {
        notify("error", error.response?.data?.message);
      }
      notify("error", error.response?.data?.message);
    }
    formik.resetForm();
  };

  /* ========== Validation ========== */
  let validationSchema = useMemo(() => {
    return Yup.object({
      comment: Yup.string()
        .required("Comment is required")
        .min(3, "Comment must be at least 3 characters long"),
      rate: Yup.number()
        .required("Rating is required")
        .min(1, "Please select a rating"),
    });
  }, []);

  /* ========== Formik Configuration ========== */
  let formik = useFormik({
    initialValues: {
      comment: "",
      rate: 0,
    },
    validationSchema,
    onSubmit: handelAddReviews,
  });

  return (
    <form className="add-reviews border-0" onSubmit={formik.handleSubmit}>
      <h2>Add Review</h2>
      <textarea
        name="comment"
        placeholder="Comment"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.comment}
        className="w-100 mb-1"
      />

      <span className="text-end">
        <StarRating
          maxStars={5}
          rate={formik.values.rate}
          onRatingChange={(value) => formik.setFieldValue("rate", value)}
        />
      </span>
      {formik.errors.rate && formik.touched.rate && (
        <span className="text-danger d-block my-1">{formik.errors.rate}</span>
      )}
      {formik.errors.comment && formik.touched.comment && (
        <span className="text-danger d-block my-1">
          {formik.errors.comment}
        </span>
      )}
      <button type="submit" disabled={formik.isSubmitting}>
        Add Review
      </button>
    </form>
  );
};

export default AddReviews;
