import React from 'react';

function CartModal({ cartItems, onClose, onRemove }) {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cartModal">
      <div className="cartModal__overlay" onClick={onClose}></div>
      <div className="cartModal__content">
        <div className="cartModal__header">
          <h2>Shopping Cart</h2>
          <button className="cartModal__closeBtn" onClick={onClose}>✕</button>
        </div>
        {cartItems.length === 0 ? (
          <p className="cartModal__empty">Your Cart is empty.</p>
        ) : (
          <div className="cartModal__body">
            {cartItems.map(item => (
              <div key={item.id} className="cartModal__item">
                <img src={item.image} alt={item.title} />
                <div className="cartModal__itemInfo">
                  <h4>{item.title}</h4>
                  <p>Price: ₹{item.price.toLocaleString('en-IN')}</p>
                  <p>Qty: {item.quantity}</p>
                  <button onClick={() => onRemove(item.id)}>Delete</button>
                </div>
              </div>
            ))}
            <div className="cartModal__footer">
              <h3>Subtotal: ₹{totalPrice.toLocaleString('en-IN')}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;