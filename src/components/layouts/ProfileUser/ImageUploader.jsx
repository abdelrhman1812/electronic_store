import { useState } from "react";

import { BiCamera, BiLoaderCircle } from "react-icons/bi";
import notify from "../../../lib/notify";
import { UpdateImageProfile } from "../../../services/Apis/userApi/userApi";

const ImageUploader = ({ setNewImage }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);

      try {
        const data = await UpdateImageProfile(formData);
        if (data.success) {
          notify("success", "successfully uploaded");
          console.log(data);
          setNewImage(data?.user?.profile?.secure_url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <label
        htmlFor="file-upload"
        className="icon-update-image position-absolute bottom-0 p-1 text-center text-white start-50 "
      >
        {loading ? <BiLoaderCircle size={35} /> : <BiCamera size={35} />}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </>
  );
};

export default ImageUploader;
