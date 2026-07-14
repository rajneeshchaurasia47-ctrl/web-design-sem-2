import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="productCard">
      <span className="productCard__category">{product.category}</span>
      <img src={product.image} alt={product.title} className="productCard__image" />
      <div className="productCard__info">
        <h3 className="productCard__title">{product.title}</h3>
        <div className="productCard__rating">
          {Array(product.rating).fill().map((_, i) => <span key={i}>⭐</span>)}
        </div>
        <div className="productCard__priceRow">
          <span className="productCard__currency">₹</span>
          <span className="productCard__priceValue">{product.price.toLocaleString('en-IN')}</span>
        </div>
        <button className="productCard__button" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;