import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import { IsLoading, PageHeader } from "../../ProductDetails";

const BrandList = ({ entities, isLoading, handleDelete, handleUpdate }) => {
  const header = [
    {
      key: "name",
      name: "Name",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  return (
    <>
      <PageHeader title="Brands" />

      <div className="container-xl py-5">
        <div className="row g-3">
          {isLoading ? (
            <IsLoading />
          ) : (
            <>
              <DynamicTable
                data={entities}
                header={header}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandList;
