import {
  addBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../../../../services/Apis/brandApi/brandApi";
import EntityManagement from "../../../../services/Hooks/EntityManagement";
import BrandList from "./BrandList";

const BrandManagement = () => {
  return (
    <EntityManagement
      type="brand"
      apis={{
        fetchEntities: getBrands,
        addEntity: addBrand,
        updateEntity: updateBrand,
        deleteEntity: deleteBrand,
      }}
      ListComponent={BrandList}
    />
  );
};

export default BrandManagement;
