import imgCustomer from "../../../assets/Images/Abdelrhman.png";

const RecentCustomers = () => {
  return (
    <>
      <div className="recentCustomers d-grid p-3">
        <div className="cardHeader">
          <h2>Recent Customers</h2>
        </div>

        <table>
          <tr>
            <td width="60px">
              <figure className="imgBx position-relative rounded-circle overflow-hidden">
                <img
                  src={imgCustomer}
                  className="position-absolute top-0 w-100 h-100 object-fit-cover"
                  alt="Abdelrhman"
                />
              </figure>
            </td>
            <td>
              <h4>
                David <br /> <span>Italy</span>
              </h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <figure className="imgBx position-relative rounded-circle overflow-hidden">
                <img
                  src={imgCustomer}
                  className="position-absolute top-0 w-100 h-100 object-fit-cover"
                  alt="Abdelrhman"
                />
              </figure>
            </td>
            <td>
              <h4>
                David <br /> <span>Italy</span>
              </h4>
            </td>
          </tr>

          <tr>
            <td width="60px">
              <figure className="imgBx position-relative rounded-circle overflow-hidden">
                <img
                  src={imgCustomer}
                  className="position-absolute top-0 w-100 h-100 object-fit-cover"
                  alt="Abdelrhman"
                />
              </figure>
            </td>
            <td>
              <h4>
                David <br /> <span>Italy</span>
              </h4>
            </td>
          </tr>

          <tr>
            <td width="60px">
              <figure className="imgBx position-relative rounded-circle overflow-hidden">
                <img
                  src={imgCustomer}
                  className="position-absolute top-0 w-100 h-100 object-fit-cover"
                  alt="Abdelrhman"
                />
              </figure>
            </td>
            <td>
              <h4>
                David <br /> <span>Italy</span>
              </h4>
            </td>
          </tr>

          <tr>
            <td width="60px">
              <figure className="imgBx position-relative rounded-circle overflow-hidden">
                <img
                  src={imgCustomer}
                  className="position-absolute top-0 w-100 h-100 object-fit-cover"
                  alt="Abdelrhman"
                />
              </figure>
            </td>
            <td>
              <h4>
                David <br /> <span>Italy</span>
              </h4>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default RecentCustomers;
