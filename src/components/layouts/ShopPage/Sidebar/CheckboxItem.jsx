import IsLoading from "../../../shared/IsLoading/IsLoading";

const CheckboxItem = ({
  selectedValues,
  items,
  handleCheckboxChange,
  type,
  isLoading,
}) => {
  return (
    <ul>
      {isLoading && <IsLoading height={10} />}

      {items.map((item, index) => (
        <li key={index} className="d-flex align-items-center gap-2 mb-2">
          <input
            type="checkbox"
            className="input-checkbox"
            id={item.slug}
            checked={selectedValues?.includes(item.slug)}
            name={type}
            value={item.slug}
            onChange={handleCheckboxChange}
          />
          <label className="m-0" htmlFor={item.slug}>{item.name}</label>
        </li>
      ))}
    </ul>
  );
};

export default CheckboxItem;
