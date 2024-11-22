import { Link } from "react-router-dom";

const ProductOption = (props) => {
  return (
    <div className="product-option my-2">
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "30px",
          height: "30px",
          marginRight: "8px",
          borderRadius: "4px",
        }}
      />
      <Link to={`/product/${props.data.value}`}>
        <span>{props.data.label}</span>
      </Link>
    </div>
  );
};

export default ProductOption;
