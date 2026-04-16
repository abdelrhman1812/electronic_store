import imgCustomer from "../../../assets/Images/Abdelrhman.png";

const RecentCustomers = () => {
  return (
    <>
      <div className="recentCustomers d-grid">
        <div className="cardHeader mb-3">
          <h2>Recent Customers</h2>
        </div>

        <div className="table-responsive">
          <table>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td width="50px">
                    <div className="profile-image-wrapper">
                      <img
                        src={imgCustomer}
                        alt="Customer"
                        style={{ width: '32px', height: '32px', borderRadius: '8px' }}
                      />
                    </div>
                  </td>
                  <td>
                    <h4 className="m-0 fw-bold" style={{ fontSize: '0.875rem' }}>
                      David
                    </h4>
                    <span className="text-muted small">Italy</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentCustomers;
