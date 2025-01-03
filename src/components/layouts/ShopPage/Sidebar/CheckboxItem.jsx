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
        <li key={index}>
          <input
            type="checkbox"
            className="me-2 input-checkbox"
            id={item.slug}
            checked={selectedValues?.includes(item.slug)}
            name={type}
            value={item.slug}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={item.slug}>{item.name}</label>
        </li>
      ))}
    </ul>
  );
};

export default CheckboxItem;
