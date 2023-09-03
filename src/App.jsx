import "./App.css";
import Header from "./Header/Header";
import CategoryList from "./CategoryList/categoryList";
import { useEffect, useState } from "react";
import axios from "./axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [fastFoodItems, setFastFoodItems] = useState([]);

  const fetchData = async (categoryID = null) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/List/${categoryID ? "categoryID=" + categoryID : ""}`
    );
    setLoading(false);
    setFastFoodItems(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <CategoryList></CategoryList>
    </div>
  );
}

export default App;
