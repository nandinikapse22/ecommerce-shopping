import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import FreeShippingBar from './components/FreeShippingBar/FreeShippingBar';
import SuperSaver from './components/supersaver/supersaver';
import RecommendedItems from './components/recomendeditems/recomendeditems';
import HiddenGems from './components/HiddenGems/HiddenGems';
import Footer from './components/Footer/Footer';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import WomenEthnicWear from './pages/WomenEthnicWear';
import WomenWesternWear from './pages/WomenWesternWear';
import ProductDetail from './pages/ProductDetail';
import CollectionsPage from './pages/CollectionsPage';
import WomenMakeup from './pages/WomenMakeup';
import WomenSkincare from './pages/WomenSkincare';
import WomenHaircare from './pages/WomenHaircare';
import WomenFragrances from './pages/WomenFragrances';
import WomenAccessories from './pages/WomenAccessories';
import MenPage from './pages/MenPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CosmeticsPage from './pages/CosmeticsPage';
import AccessoriesPage from './pages/AccessoriesPage';
import AdminApp from './admin/AdminApp';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FreeShippingBar />
              <SuperSaver />
              <RecommendedItems />
              <HiddenGems />
            </>
          } />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/women/ethnic-wear" element={<WomenEthnicWear />} />
          <Route path="/women/ethnic-wear/:category" element={<WomenEthnicWear />} />
          <Route path="/women/western-wear" element={<WomenWesternWear />} />
          <Route path="/women/western-wear/:category" element={<WomenWesternWear />} />
          <Route path="/women/beauty/makeup" element={<WomenMakeup />} />
          <Route path="/women/beauty/skincare" element={<WomenSkincare />} />
          <Route path="/women/beauty/haircare" element={<WomenHaircare />} />
          <Route path="/women/beauty/fragrances" element={<WomenFragrances />} />
          <Route path="/women/accessories" element={<WomenAccessories />} />
          <Route path="/women/accessories/:category" element={<WomenAccessories />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/men/:category" element={<MenPage />} />
          <Route path="/cosmetics" element={<CosmeticsPage />} />
          <Route path="/cosmetics/makeup" element={<WomenMakeup />} />
          <Route path="/cosmetics/skincare" element={<WomenSkincare />} />
          <Route path="/cosmetics/haircare" element={<WomenHaircare />} />
          <Route path="/cosmetics/fragrances" element={<WomenFragrances />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:category" element={<WomenAccessories />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
