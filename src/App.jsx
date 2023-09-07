import "./App.css";
import Header from "./Header/Header";
import CategoryList from "./CategoryList/categoryList";
import { useEffect, useState } from "react";
import Loading from "./Loading/loading";
import axios from "./axios";
import FastFoodList from "./FastFoodList/fastFoodList";
import SearchBar from "./SearchBar/searchBar";
import notFound from "./assets/images/404.png";

function App() {
  const [loading, setLoading] = useState(false);
  const [fastFoodItems, setFastFoodItems] = useState([]);

  const fetchData = async (categoryID = null) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/List/${categoryID ? "?categoryID=" + categoryID : ""}`
    );
    setLoading(false);
    setFastFoodItems(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterItems = (categoryID) => {
    fetchData(categoryID);
  };

  const searchItem = async (term) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/search/${term ? "?term=" + term : ""}`
    );
    setLoading(false);
    setFastFoodItems(response.data);
  };

  const renderContent = () => {
    if (loading) return <Loading theme={"dark"}></Loading>;

    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            برای کلید واژه فوق، آیتمی یافت نشد
          </div>
          <img className="mx-auto mt-5 d-block fade-in-horiz" src={notFound} />
        </>
      );
    }

    return <FastFoodList fastFoodItems={fastFoodItems}></FastFoodList>;
  };
  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <CategoryList filterItems={filterItems}>
        <SearchBar searchItem={searchItem} />
      </CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
