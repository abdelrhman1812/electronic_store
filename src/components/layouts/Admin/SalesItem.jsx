const SalesItem = ({ title, amount, icon }) => {
  return (
    <div className="col-sm-6 col-md-4">
      <div className="sales-item p-3">
        <div className="d-flex justify-content-between">
          <h4>{title}</h4>
          {icon}
        </div>
        <p>{amount}</p>
      </div>
    </div>
  );
};

export default SalesItem;
