import { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import ChangePassword from "./ChangePassword ";
import UpdateUserForm from "./UpdateUserForm";

const AccountInfo = () => {
  const { userProfile } = useUserContext();
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <section className="account-info">
      <div className="row m-0">
        <section className="user-information">
          {isUpdate ? (
            <>
              <h2>Update Data</h2>
              <small className="text-warning">
                There is an error in updating the data, I am working on it. But
                if you need to modify any data, you have to send your email. So
                if I`m going to change the name, send the email as well.
              </small>
              <UpdateUserForm setIsUpdate={setIsUpdate} isUpdate={isUpdate} />
            </>
          ) : (
            <>
              <h2>Account Information</h2>
              <div className="item d-flex gap-3">
                <p>
                  Name :{" "}
                  <span>{userProfile?.user?.name || "Not provided"}</span>
                </p>
              </div>
              <div className="item d-flex gap-3">
                <p>
                  Email :
                  <span>{userProfile?.user?.email || "Not provided"}</span>
                </p>
              </div>
              <div className="item d-flex gap-3">
                <p>
                  Address :
                  <span>{userProfile?.user?.address || "Not provided"}</span>
                </p>
              </div>
              <div className="item d-flex gap-3">
                <p>
                  Phone :
                  <span>{userProfile?.user?.phone || "Not provided"}</span>
                </p>
              </div>
              <button onClick={() => setIsUpdate(!isUpdate)}>
                Update Data
              </button>
            </>
          )}
        </section>
      </div>

      <div className="row  py-3 m-0 my-3  border-top border-dark-subtle">
        <ChangePassword />
      </div>
    </section>
  );
};

export default AccountInfo;
