import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <p className="header-text">
          <i className="fas fa-truck"></i>
          Free Shipping on Orders Over $50 | Use Code: <strong>FASHION20</strong> for 20% Off
        </p>
      </div>
    </header>
  );
}

export default Header;
