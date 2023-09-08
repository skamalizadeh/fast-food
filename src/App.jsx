import "./App.css";
import Header from "./Header/Header";
import CategoryList from "./CategoryList/categoryList";
import { useState } from "react";
import Loading from "./Loading/loading";
import FastFoodList from "./FastFoodList/fastFoodList";
import SearchBar from "./SearchBar/searchBar";
import notFound from "./assets/images/404.png";
import useAxios from "./useAxios";

function App() {
  const [url, setUrl] = useState("/FastFood/list");
  const [fastFoodItems, , loading] = useAxios({ url }); //get method is default

  const filterItems = (categoryID) => {
    setUrl(`/FastFood/List/${categoryID ? "?categoryID=" + categoryID : ""}`);
  };

  const searchItem = async (term) => {
    setUrl(`/FastFood/search/${term ? "?term=" + term : ""}`);
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
