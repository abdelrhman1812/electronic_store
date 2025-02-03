import { useCallback } from "react";
import { Helmet } from "react-helmet";
import { FaTrash } from "react-icons/fa";
import CartItem from "../../components/layouts/CartPage/CartItem";
import OrderSummary from "../../components/layouts/CartPage/OrderSummary";
import Empty from "../../components/shared/Empty/Empty";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useCartContext } from "../../context/CartContext";
import notify from "../../lib/notify";
import "./../../assets/style/cart.css";

const CartPage = () => {
  const {
    cart,
    totalPrice,
    updateQuantityOfProduct,
    deleteItemFromCart,
    clearUserCart,
    isLoading,
  } = useCartContext();

  /* Function to update quantity */
  const handleUpdateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity < 1) return;
      updateQuantityOfProduct(productId, quantity);
      notify("success", "Quantity updated");
    },
    [updateQuantityOfProduct]
  );

  /* Function to delete item from cart */
  const handleDeleteItem = useCallback(
    (productId) => {
      deleteItemFromCart(productId);
      notify("error", "Item deleted");
    },
    [deleteItemFromCart]
  );

  /* Function to clear user cart */
  const handleClearUserCart = useCallback(() => {
    clearUserCart();
    notify("error", "Cart cleared");
  }, [clearUserCart]);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <main className="cart-page">
        <PageHeader title="Cart" />
        <div className="container-xl py-5 cart">
          {isLoading ? (
            <div className="row m-0">
              <IsLoading count={4} columns={1} height={100} />
            </div>
          ) : cart.length === 0 ? (
            <Empty title="Your cart is empty" description="Start shopping" />
          ) : (
            <div className="row g-4 p-3">
              <div className="col-lg-8 items p-3">
                {cart.map((product) => (
                  <CartItem
                    key={product.productId._id}
                    product={product}
                    handleUpdateQuantity={handleUpdateQuantity}
                    handleDeleteItem={handleDeleteItem}
                    isLoading={isLoading}
                  />
                ))}

                {/* Clear cart */}
                <button
                  onClick={handleClearUserCart}
                  className="clear border-0 mt-3 d-block mx-auto fw-bold d-flex align-items-center justify-content-center"
                  disabled={isLoading}
                >
                  <span>Clear Cart</span>
                  <FaTrash className="text-light" size={16} />
                </button>
              </div>
              <OrderSummary cart={cart} totalPrice={totalPrice} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CartPage;
