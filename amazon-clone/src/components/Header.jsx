import React from 'react';

function Header({ cartCount, setSearchQuery, onCartClick }) {
  return (
    <header className="header">
      <div className="header__logoContainer">
        <img className="header__logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
        <span className="header__country">.in</span>
      </div>
      <div className="header__search">
        <input 
          type="text" 
          className="header__searchInput" 
          placeholder="Search Amazon Clone..." 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="header__searchButton">🔍</button>
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello, Sign in</span>
          <span className="header__optionLineTwo">Account</span>
        </div>
        <div className="header__cart" onClick={onCartClick}>
          <div className="header__cartIconContainer">
            <span className="header__cartCount">{cartCount}</span>
            <span className="header__cartIcon">🛒</span>
          </div>
          <span className="header__cartText">Cart</span>
        </div>
      </div>
    </header>
  );
}

export default Header;