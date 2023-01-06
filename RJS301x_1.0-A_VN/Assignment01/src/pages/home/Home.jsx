import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Maincontent from "../../components/Maincontent/Maincontent";
import NavBarmain from "../../components/navBar/NavBarMain";
const Home = () => {
  return (
    <div>
      <NavBarmain></NavBarmain>
      <Header></Header>
      <Maincontent></Maincontent>
      <Footer></Footer>
    </div>
  );
};

export default Home;
