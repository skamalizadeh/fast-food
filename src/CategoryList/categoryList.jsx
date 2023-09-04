import { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "../Loading/loading";

const CategoryList = ({ filterItems }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/FoodCategory/categories");
      setCategories(response.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const renderContent = () => {
    if (loading) return <Loading theme="primary"></Loading>;
    else
      return (
        //create horizontal menu
        <ul className="nav">
          <li className="nav-item" onClick={() => filterItems}>
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
