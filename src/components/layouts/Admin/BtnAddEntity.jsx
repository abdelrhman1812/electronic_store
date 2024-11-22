const BtnAddEntity = ({ type, toggleForm, currentEntityId }) => {
  return (
    <button
      className="icon-btn add-btn position-relative overflow-hidden"
      onClick={toggleForm}
    >
      <div className="add-icon"></div>
      <div className="btn-txt">
        {currentEntityId ? `Update ${type}` : `Add New ${type}`}
      </div>
    </button>
  );
};

export default BtnAddEntity;
