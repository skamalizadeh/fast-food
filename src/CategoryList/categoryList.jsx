import { useEffect, useState } from "react";
import Loading from "../Loading/loading";
import SearchBar from "../SearchBar/searchBar";
import useAxios from "../useAxios";

const CategoryList = ({ filterItems, children }) => {
  const [categories, , loading] = useAxios({ url: "/FoodCategory/categories" });

  const renderContent = () => {
    if (loading) return <Loading theme="primary"></Loading>;
    else
      return (
        <div className="ps-3 w-100 d-flex align-items-center justify-content-between gap-5">
          {/* create horizontal menu */}
          <ul className="nav">
            <li className="nav-item" onClick={() => filterItems()}>
              <a className="nav-link" href="#">
                همه فست فودها
              </a>
            </li>
            {categories.map((category) => (
              <li
                className="nav-item"
                key={category.id}
                onClick={() => filterItems(category.id)}
              >
                <a className="nav-link" href="#">
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
          {children}
        </div>
      );
  };
  return (
    //type of container and marging negative 5px
    <nav className="container mt-n5">
      <div
        //Display:flex(together) and padding y=4 and
        className="d-flex align-items-center bg-white rounded-3 shadow-lg py-4"
        style={{ height: "80px" }} //inline stylesheet
      >
        {renderContent()}
      </div>
    </nav>
  );
};
export default CategoryList;
