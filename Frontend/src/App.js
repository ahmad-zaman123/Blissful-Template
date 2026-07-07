import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap first
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Then custom CSS
import { Analytics } from '@vercel/analytics/react';
import HomePage from './HomePage';
import Header from './Header';
import Footer from './Footer';
// import { Navbar } from 'react-bootstrap';
import Navbar from './Navbar';
import Logo from './Logo';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import RefundPolicy from './RefundPolicy';
import ShippingPolicy from './ShippingPolicy';
import ShopAll from './ShopAll';
import Bundles from './Bundles';
import Serums from './Serums';
import Moisturisers from './Moisturisers';
import Cleansers from './Cleansers';
import Sunscreen from './Sunscreen';
import Breakouts_acne from './Breakouts_acne';
import Dryness from './Dryness';
import DarkSpots from './DarkSpots';
import HealthyAging from './HealthyAging';
import Description from './Description'
// import MyBag from './Bag';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import Cart from './Cart';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './ScrollToTop';


function App() {
  return (
    <>

<BrowserRouter>
<ScrollToTop />
<CartProvider>

<Header />
<Logo />
    <Navbar />

    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/HOME" element={<HomePage />}></Route>
      <Route path="/SHOPALL" element={<ShopAll />}></Route>

      <Route path="/SHOP-BY-CATEGORY/SERUMS" element={<Serums />}></Route>
      <Route path="/shop-by-category/moisturisers" element={<Moisturisers />}></Route>
      <Route path="/shop-by-category/cleansers" element={<Cleansers />}></Route>
      <Route path="/shop-by-category/sunscreens" element={<Sunscreen />}></Route>

      <Route path="/shop-by-skin-concern/breakouts_acne" element={<Breakouts_acne/>}></Route>
      <Route path="/shop-by-skin-concern/dryness" element={<Dryness />}></Route>
      <Route path="/shop-by-skin-concern/dark-spots" element={<DarkSpots />}></Route>
      <Route path="/shop-by-skin-concern/healthy-aging" element={<HealthyAging />}></Route>

      <Route path="/description/:id" element={<Description />}></Route>
      {/* <Route path="/BAG" element={<MyBag />}></Route> */}
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/order-confirmation/:id" element={<OrderConfirmation />}></Route>
      <Route path="/CART" element={<Cart />}></Route>

      <Route path="/BUNDLES" element={<Bundles />}></Route>
      <Route path="/ABOUTUS" element={<AboutUs />}></Route>
      <Route path="/CONTACTUS" element={<ContactUs />}></Route>
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
      <Route path="/TermsOfService" element={<TermsOfService />}></Route>
      <Route path="/RefundPolicy" element={<RefundPolicy />}></Route>
      <Route path="/ShippingPolicy" element={<ShippingPolicy />}></Route>

    </Routes>

    <br />

    <Footer />

    </CartProvider>
    </BrowserRouter>
    <Analytics />
    {/* <Footer /> */}

    </>

  );
}

export default App;