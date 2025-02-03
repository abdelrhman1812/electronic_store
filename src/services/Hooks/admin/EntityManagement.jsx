import { useEffect } from "react";
import BtnAddEntity from "../../../components/layouts/Admin/BtnAddEntity";
import SharedForm from "../../../components/layouts/Admin/SharedForm";
import { useEntityManagement } from "./useEntityManagement";

const EntityManagement = ({ type, apis, ListComponent }) => {
  const {
    isOpen,
    loading,
    entities,
    currentEntityId,
    formik,
    toggleForm,
    closeForm,
    handleUpdate,
    handleDelete,
    fetch,
    error,
  } = useEntityManagement(type, apis);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="p-2">
      <BtnAddEntity
        toggleForm={toggleForm}
        type={type}
        currentEntityId={null}
      />

      {isOpen && (
        <SharedForm
          error={error}
          formik={formik}
          loading={loading.submit}
          type={type}
          onSubmit={formik.handleSubmit}
          onClose={closeForm}
          currentEntityId={currentEntityId}
        />
      )}

      <ListComponent
        handleDelete={handleDelete}
        entities={entities}
        isLoading={loading.fetch}
        handleUpdate={handleUpdate}
      />
    </section>
  );
};

export default EntityManagement;
