import { useCallback, useMemo, useState } from "react";
import { BiEdit, BiSearch, BiTrash } from "react-icons/bi";
import ConfirmationModal from "../../common/ConfirmationModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteContext, setDeleteContext] = useState(null); // { id, isBulk }

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const startIndex = (currentPage - 1) * limitPerPage;
  const endIndex = startIndex + limitPerPage;

  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, startIndex, endIndex]);

  const handleShowItems = useCallback(
    (e) => {
      setCurrentPage(1);
      setLimit(Number(e.target.value));
    },
    [setCurrentPage, setLimit],
  );

  const getItemsIds = useCallback((e) => {
    const { id, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id),
    );
  }, []);

  const deleteItems = useCallback(() => {
    setDeleteContext({ isBulk: true });
    setIsModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteContext?.isBulk) {
      onMultipleDelete(selectedIds, setSelectedIds);
    } else if (deleteContext?.id) {
      onDelete(deleteContext.id);
    }
    setIsModalOpen(false);
    setDeleteContext(null);
  }, [deleteContext, selectedIds, onMultipleDelete, onDelete]);

  const initiateDelete = useCallback((id) => {
    setDeleteContext({ id, isBulk: false });
    setIsModalOpen(true);
  }, []);

  return (
    <div className="dynamic_table_container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div
          className="search-wrapper position-relative flex-grow-1"
          style={{ maxWidth: "400px" }}
        >
          <BiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search here..."
            className="form-control rounded-pill ps-5 border-light shadow-none"
            style={{ fontSize: "0.9rem", height: "42px" }}
          />
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={deleteItems}
            className="btn btn-danger rounded-pill px-4 d-flex align-items-center gap-2"
            style={{ fontSize: "0.85rem" }}
          >
            <BiTrash /> Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="dynamic_table">
          <thead>
            <tr>
              <th className="text-center" style={{ width: "50px" }}>
                <input
                  type="checkbox"
                  className="form-check-input shadow-none"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(paginatedData.map((i) => i._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                  checked={
                    selectedIds.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                />
              </th>
              <th className="text-center">#</th>
              {header.map((item) => (
                <th
                  key={item.key}
                  className={item.key === "actions" ? "text-end" : ""}
                >
                  {item.name}
                </th>
              ))}
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={header.length + 3}>
                  <LoadingTable />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length + 3}
                  className="text-center py-5 text-muted"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-check-input shadow-none"
                      id={item._id}
                      onChange={getItemsIds}
                      checked={selectedIds.includes(item._id)}
                    />
                  </td>
                  <td className="text-center text-muted">
                    {startIndex + index + 1}
                  </td>
                  {header.map((item2) => {
                    const value =
                      item2.key === "image" || item2.key === "imageCover"
                        ? item?.image?.secure_url ||
                          item?.imageCover?.secure_url
                        : item2.key === "images"
                          ? item?.images?.map((image) => image.secure_url)
                          : item2.custom
                            ? item2.custom(item)
                            : item[item2.key];

                    return (
                      <td key={item2.key} className="align-middle">
                        {item2.key === "image" || item2.key === "imageCover" ? (
                          <img
                            src={value}
                            alt=""
                            width={45}
                            height={45}
                            className="bg-light border"
                          />
                        ) : item2.key === "images" ? (
                          <div className="d-flex gap-1">
                            {value.slice(0, 3).map((image, idx) => (
                              <img
                                key={idx}
                                src={image}
                                alt=""
                                width={35}
                                height={35}
                                className="bg-light border"
                              />
                            ))}
                            {value.length > 3 && (
                              <span className="text-muted small align-self-end">
                                +{value.length - 3}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="fw-medium text-dark">{value}</div>
                        )}
                      </td>
                    );
                  })}
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        onClick={() => onUpdate(item)}
                        className="btn btn-sm btn-subtle-primary p-2 rounded-3 text-primary"
                        title="Edit"
                        style={{ background: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <BiEdit size={18} />
                      </button>
                      <button
                        onClick={() => initiateDelete(item._id)}
                        className="btn btn-sm btn-subtle-danger p-2 rounded-3 text-danger"
                        title="Delete"
                        style={{ background: "rgba(239, 68, 68, 0.1)" }}
                      >
                        <BiTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > limitPerPage && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-4 pt-4 border-top">
          <div className="d-flex align-items-center gap-3">
            <label className="text-muted small">Items per page:</label>
            <select
              id="limitPerPage"
              onChange={handleShowItems}
              className="form-select form-select-sm rounded-pill px-3 shadow-none overflow-hidden"
              style={{ width: "80px", cursor: "pointer" }}
              value={limitPerPage}
            >
              {[5, 10, 15, 20].map((num) => (
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
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={deleteContext?.isBulk ? "Delete Multiple Items" : "Delete Item"}
        message={
          deleteContext?.isBulk
            ? `Are you sure you want to delete ${selectedIds.length} items? This action cannot be undone.`
            : "Are you sure you want to delete this item? This action cannot be undone."
        }
      />
    </div>
  );
};

export default DynamicTable;
