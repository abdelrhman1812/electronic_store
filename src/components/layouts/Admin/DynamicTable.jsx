import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import Pagination from "../../common/Pagination/Pagination";

const DynamicTable = ({
  limitPerPage,
  currentPage,
  header,
  data,
  setCurrentPage,
  itemsPerPage,
  setLimit,

  onDelete = () => {},
  onUpdate,
}) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * limitPerPage;
  const endIndex = limitPerPage * currentPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search"
        className="form-control mb-3"
      />
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
          {paginatedData?.map((item, index) => (
            <tr key={item._id || index}>
              <td className="text-center">{startIndex + index + 1}</td>
              {header.map((item2) => {
                const value =
                  item2.key === "image" || item2.key === "imageCover"
                    ? item?.image?.secure_url || item.imageCover?.secure_url
                    : item2.key === "images"
                    ? item?.images?.map((image) => image.secure_url)
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
                    ) : item2.key === "images" ? (
                      value.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image of ${item.name || "item"}`}
                          className="img-thumbnail mx-1 rounded shadow-sm"
                          width={50}
                          height={50}
                        />
                      ))
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
        <tfoot>
          <tr>
            <td colSpan={header.length + 1}>
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <select
                    id="limitPerPage"
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="form-select form-select-sm"
                  >
                    <option value="5">5</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <Pagination
                  data={filteredData}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default DynamicTable;
