import { BiEdit, BiTrash } from "react-icons/bi";

const DynamicTable = ({ header, data, onDelete, onUpdate }) => {
  return (
    <table className="table table-striped table-hover table-bordered dynamic_table">
      {/* header */}
      <thead className="table-white">
        <tr>
          <th scope="col" className="text-center">
            Id
          </th>
          {header.map((item) => (
            <th key={item.key} scope="col" className="text-center">
              {item.name}
            </th>
          ))}
          <th scope="col" className="text-center">
            Actions
          </th>
        </tr>
      </thead>

      {/* body */}
      <tbody>
        {data.map((item, index) => (
          <tr key={item._id || index}>
            <td className="text-center">{index + 1}</td>
            {header.map((item2) => {
              const value =
                item2.key === "image" || item2.key === "imageCover"
                  ? item?.image?.secure_url || item.imageCover?.secure_url
                  : item2.custom
                  ? item2.custom(item)
                  : item[item2.key];

              return (
                <td key={item2.key} className="text-center align-middle">
                  {item2.key === "image" || item2.key === "imageCover" ? (
                    <img
                      src={value}
                      alt={`Image of ${item.name || "item"}`}
                      className="img-thumbnail rounded shadow-sm"
                      width={50}
                      height={50}
                    />
                  ) : (
                    value
                  )}
                </td>
              );
            })}
            <td>
              <div className="d-flex justify-content-center gap-2 my-2">
                <BiEdit
                  onClick={() => onUpdate(item)}
                  size={20}
                  className="text-primary cursor-pointer"
                />
                <BiTrash
                  onClick={() => onDelete(item._id)}
                  size={20}
                  className="text-danger cursor-pointer"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
