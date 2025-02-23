import { useCallback, useMemo, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import LoadingTable from "../../common/Loading-table";
import Pagination from "../../common/Pagination/Pagination";

const DynamicTable = ({
  limitPerPage,
  currentPage,
  header,
  data = [],
  setCurrentPage,
  itemsPerPage,
  setLimit,
  loading,
  onDelete = () => {},
  onMultipleDelete = () => {},
  onUpdate = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  /* ========= Filter ========= */
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  /* ========= Pagination ========= */
  const startIndex = (currentPage - 1) * limitPerPage;
  const endIndex = startIndex + limitPerPage;

  /* ========= Render Table ========= */
  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, startIndex, endIndex]);

  /* ========= Show Items ========= */
  const handleShowItems = useCallback(
    (e) => {
      setCurrentPage(1);
      setLimit(Number(e.target.value));
    },
    [setCurrentPage, setLimit]
  );

  /* ========= Select/Deselect Items and Delete ========= */
  const getItemsIds = useCallback((e) => {
    const { id, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  }, []);

  const deleteItems = useCallback(() => {
    onMultipleDelete(selectedIds, setSelectedIds);
  }, [selectedIds, onMultipleDelete]);

  return (
    <>
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search"
        className="form-control mb-3"
      />
      <table className="table table-striped table-hover table-bordered dynamic_table">
        {/* Header */}
        <thead className="table-white">
          <tr>
            <th scope="col" className="text-center">
              Select
            </th>
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

        {/* Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={header.length + 3}>
                <LoadingTable />
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => (
              <tr key={item._id || index}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    id={item._id}
                    onChange={getItemsIds}
                    checked={selectedIds.includes(item._id)}
                  />
                </td>
                <td className="text-center">{startIndex + index + 1}</td>
                {header.map((item2) => {
                  const value =
                    item2.key === "image" || item2.key === "imageCover"
                      ? item?.image?.secure_url || item?.imageCover?.secure_url
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
                        value.map((image, idx) => (
                          <img
                            key={idx}
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
            ))
          )}
        </tbody>

        {/* Footer */}
        <tfoot>
          <tr>
            <td colSpan={header.length + 2}>
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="limitPerPage">Show:</label>
                  <select
                    id="limitPerPage"
                    onChange={handleShowItems}
                    className="form-select form-select-sm"
                  >
                    {[5, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
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
            <td>
              <button
                onClick={deleteItems}
                className="btn btn-danger"
                disabled={selectedIds.length === 0}
              >
                Delete Selected
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default DynamicTable;
