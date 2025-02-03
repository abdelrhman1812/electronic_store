import getAuthToken from "../../../lib/cookies";
import clientApi from "../../clientApi";

const updateUserAccount = async (values) => {
  const response = await clientApi.put("/users/update-account", values);
  return response?.data;
};

const changePassword = async (values) => {
  const response = await clientApi.put("/users/change-password", values);
  return response?.data;
};

const UpdateImageProfile = async (formData) => {
  try {
    const response = await clientApi.post("/users/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const getUserAccount = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No token found");
  const response = await clientApi.get("/users");
  return response?.data;
};
export {
  changePassword,
  getUserAccount,
  UpdateImageProfile,
  updateUserAccount,
};
