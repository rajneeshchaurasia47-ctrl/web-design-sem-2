import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import './App.css';

const PRODUCTS_DATA = [
  { id: 1, title: "Apple iPhone 15 Pro (128 GB) - Natural Titanium", price: 129900, rating: 5, image: "https://images-cdn.ubuy.co.in/65293da27d04bc063857ca46-apple-iphone-15-pro-128gb-natural.jpg", category: "Electronics" },
  { id: 2, title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", price: 29990, rating: 4, image: "https://m.media-amazon.com/images/I/61+9m699XRL._SL1500_.jpg", category: "Electronics" },
  { id: 3, title: "Minimalist 10% Vitamin C Face Serum for Glowing Skin", price: 699, rating: 4, image: "https://m.media-amazon.com/images/I/61VvG7SgrBL._SL1500_.jpg", category: "Grooming" },
  { id: 4, title: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel - SPF 50", price: 499, rating: 5, image: "https://m.media-amazon.com/images/I/51wXpG9kRXL._SL1000_.jpg", category: "Grooming" },
  { id: 5, title: "ASUS ROG Strix G16 (2024) Gaming Laptop, 16\" QHD+", price: 144990, rating: 5, image: "https://m.media-amazon.com/images/I/719b6gGHg3L._SL1500_.jpg", category: "Electronics" },
  { id: 6, title: "Pilgrim Spanish Red Vine Face Wash with Vitamin C", price: 350, rating: 4, image: "https://m.media-amazon.com/images/I/61M6rA9nLSL._SL1500_.jpg", category: "Grooming" }
];

function App() {
  const [products] = useState(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Header cartCount={cartCount} setSearchQuery={setSearchQuery} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="app__banner">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Laptop/Intel/CoreUltra/March/PC_Banner_1500x300._CB579339396_.jpg" alt="Banner" />
      </div>

      <main className="app__main">
        <h2 className="app__sectionTitle">Trending Deals on Amazon</h2>
        <div className="app__productGrid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </main>

      {isCartOpen && (
        <CartModal cartItems={cart} onClose={() => setIsCartOpen(false)} onRemove={removeFromCart} />
      )}
    </div>
  );
}

0export default App;