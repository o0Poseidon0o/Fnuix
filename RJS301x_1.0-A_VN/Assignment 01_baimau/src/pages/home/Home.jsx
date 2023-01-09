import NavBar from "../../components/Components/NavBar/NavBar";
import Header from "../../components/Components/Header/Header";
import Cities from "../../components/Components/City/Cities";
import HotelType from "../../components/Components/HotelType/HotelType";
import Hotels from "../../components/Components/Hotel/Hotels";
import Register from "../../components/Components/Register/Register";
import Footer from "../../components/Components/Footer/Footer";
const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <Cities />
      <HotelType />
      <Hotels />
      <Register />
      <Footer />
    </div>
  );
};

export default Home;
