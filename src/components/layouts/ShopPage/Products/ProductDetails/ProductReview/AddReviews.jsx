import { useFormik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import { checkAuthToken } from "../../../../../../lib/cookies";
import notify from "../../../../../../lib/notify";
import { addReviews } from "../../../../../../services/Apis/reviewsApi/reviewsApi";
import StarRating from "../../../../../common/StarRating";

const AddReviews = ({ productId, updateProductReviews }) => {
  const handelAddReviews = async (values) => {
    try {
      await addReviews(values, productId);

      if (checkAuthToken()) return "You MUST be logged in";

      updateProductReviews();
      notify("success", "Reviews added successfully");
      formik.resetForm();
    } catch (error) {
      if (error.response?.data?.message === "Your are already reviewed") {
        notify("error", error.response?.data?.message);
      } else {
        if (!checkAuthToken()) {
          notify("error", "You Must be logged in");
          return false;
        }

        notify("error", error.response?.data?.message);
      }
    }
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      comment: Yup.string()
        .required("Comment is required")
        .min(3, "Comment must be at least 3 characters long"),
      rate: Yup.number()
        .required("Rating is required")
        .min(1, "Please select a rating"),
    });
  }, []);

  const formik = useFormik({
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
