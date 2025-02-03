import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../../services/Apis/categoryApi/CategoryApi";
import EntityManagement from "../../../../services/Hooks/admin/EntityManagement";
import CategoryList from "./CategoryList";

const CategoryManagement = () => {
  return (
    <EntityManagement
      type="category"
      apis={{
        fetchEntities: getCategories,
        addEntity: addCategory,
        updateEntity: updateCategory,
        deleteEntity: deleteCategory,
      }}
      ListComponent={CategoryList}
    />
  );
};

export default CategoryManagement;
