import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap first
import BlissfulGif from './Blissfulgif';
import BuildYourRoutine from './BuildYourRoutune';
import OurBestSeller from './OurBestSeller';
import ProductBar from "./ProductBar";
import Reviews from "./Reviews";
import IconBar from "./IconBar";
import SelfCare from "./SelfCare";
import HomeCarosuel from "./HomeCarosuel";
import Board from "./Board";
import BundlesHome from "./BundlesHome";


const HomePage = () => {
  return (
    <>
     
        
        <HomeCarosuel /><br />
        <BlissfulGif></BlissfulGif>
        <BuildYourRoutine></BuildYourRoutine>
        <SelfCare />
        <OurBestSeller></OurBestSeller>
         <br />
        <BundlesHome /><br />
        <ProductBar /><br /><br /><br />
        <Board src="https://shopblissfulbeauty.com/cdn/shop/files/banner2.jpg?v=1732079177&width=2000" /><br />
        <Reviews />
        <IconBar />
    </>
  );
};

export default HomePage;