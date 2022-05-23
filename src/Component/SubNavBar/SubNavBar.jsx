import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBlogByBlogListId,
  getProductByCategory,
} from "../../app/apiRequest";
import { getCategoryCurrentSuccess } from "../../app/productSlice/categorySlice";
import { getCurrentBlogSuccess } from "../../app/blogSlice/blogsSlice";

const SubNavBar = (props) => {
  const { dataCate, name } = props;

  const dispath = useDispatch();
  const handleActive = async (e, data) => {
    const elementLi = document.querySelectorAll(".sub-menu");
    elementLi.forEach((li) => {
      li.classList.remove("active-sub-menu");
    });
    e.target.closest(".sub-menu").classList.toggle("active-sub-menu");

    switch (name) {
      case "category":
        getProductByCategory(dispath, data.id);
        dispath(getCategoryCurrentSuccess(data));
        break;
      case "bloglist":
        getBlogByBlogListId(dispath, data.id);
        dispath(getCurrentBlogSuccess(data));
        break;
      default:
        break;
    }
  };

  return (
    <>
      {dataCate?.map((item) => (
        <Link
          to={`${name == "category" ? "product" : "blog"}/${name}_id=${
            item.id
          }`}
          key={item.id}
        >
          <li
            onClick={(e, data) => handleActive(e, item)}
            className="sub-menu flex flex-row items-center text-[0.8rem] pl-8 py-2 w-full rounded-br-3xl rounded-tr-3xl text-[#777] hover:text-bgButton border-l-4 border-[#fefce8] dark:border-[black] cursor-pointer"
          >
            {item.title}
          </li>
        </Link>
      ))}
    </>
  );
};

export default memo(SubNavBar);
