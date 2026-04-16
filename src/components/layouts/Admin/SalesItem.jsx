const SalesItem = ({ title, amount, icon }) => {
  return (
    <div className="col-sm-6 col-md-4">
      <div className="sales-item">
        <div className="icon-box">
          {icon}
        </div>
        <div>
          <h4>{title}</h4>
          <p className="amount">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesItem;
