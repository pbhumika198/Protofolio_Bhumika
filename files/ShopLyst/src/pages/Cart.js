import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cart.length === 0 && <p className="empty">Your cart is empty</p>}

      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt="" />

            <div className="cart-details">
              <h4>{item.title}</h4>
              <p>₹ {item.price}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>

            <div className="cart-actions">
              <p className="price">₹ {(item.price * item.qty).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹ {total.toFixed(2)}</h3>
          <button className="checkout">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;