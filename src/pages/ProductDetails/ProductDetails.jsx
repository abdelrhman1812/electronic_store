import { useEffect, useState } from "react";
import { BiCart, BiHeart, BiSolidStar, BiStar } from "react-icons/bi";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { getProductSpecific } from "../../services/Apis/productApi/ProductApi";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getSpecificProduct = async () => {
    const data = await getProductSpecific(id);
    console.log(data.product);
    setProduct(data?.product);
  };

  useEffect(() => {
    getSpecificProduct();
  }, [id]);

  return (
    <section className="product-details overflow-hidden">
      <PageHeader title={product?.title?.split(" ").splice(0, 6).join(" ")} />
      <div className="container-xl py-5">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <figure>
                  <img
                    src={product?.imageCover?.secure_url}
                    className="w-100"
                    alt={product?.title}
                  />
                </figure>
              </div>
            </div>
            <div className="col-12 images">
              {product?.images?.map((image, index) => (
                <img
                  src={image.secure_url}
                  className="w-100"
                  alt={`product-image-${index}`}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="product-data">
              <h3>{product?.title}</h3>
              <div className="rating d-flex gap-2">
                <p>
                  <BiSolidStar className="text-warning" />
                  <BiSolidStar className="text-warning" />
                  <BiSolidStar className="text-warning" />
                  <BiSolidStar className="text-warning" />
                  <BiStar className="text-muted" />
                </p>
                <span className="text-muted">(1 customer review)</span>
              </div>
              <h4>${product?.price}</h4>
              {/* <p className="text-muted"> {product?.category?.name}</p> */}
              <p className="text-muted descriptions">{product?.description}</p>

              <div className="quantity mb-3 d-flex gap-3 align-items-center">
                <button>-</button>
                <span>3</span>
                <button>+</button>
              </div>

              <button className="cart">
                <BiCart className="icon-cart" /> Add to cart
              </button>
              <BiHeart size={30} className="icon-wishlist" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
