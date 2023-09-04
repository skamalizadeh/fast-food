import "./App.css";
import Header from "./Header/Header";
import CategoryList from "./CategoryList/categoryList";
import { useEffect, useState } from "react";
import Loading from "./Loading/loading";
import axios from "./axios";
import FastFoodList from "./FastFoodList/fastFoodList";

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

  const renderContent = () => {
    if (loading) return <Loading theme={"dark"}></Loading>;
    else return <FastFoodList fastFoodItems={fastFoodItems}></FastFoodList>;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <CategoryList filterItems={filterItems}></CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
