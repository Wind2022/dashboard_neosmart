import { Link } from "react-router-dom";
import { MdOutlineSmartToy } from "react-icons/md";
import { BiCategoryAlt, BiMailSend, BiListOl } from "react-icons/bi";
import { FaMicroblog, FaRegNewspaper } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SubNavBar from "./SubNavBar/SubNavBar";
import { clientApi } from "../api/api";

const NavBar = ({ show }) => {
  // get User from redux
  const user = useSelector((state) => state.auth.login.currentUser);
  // const getListBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  const [getListBlog, setGetListBlog] = useState([]);
  const [dataCate, setDataCate] = useState();

  // Active NavBar
  const handleActive = (e, i) => {
    const elementLi = document.querySelectorAll("li");
    let getIdSub = document.getElementById(i);
    elementLi.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.closest(".menu").classList.toggle("active");
    getIdSub.classList.toggle("show-sub");
  };

  // End Active NavBar

  //Get list Blog
  const getList = async () => {
    try {
      const res = await clientApi.listBlogShow();
      setGetListBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  //end list Blog

  // Get Category
  useEffect(() => {
    const dataCate = async () => {
      try {
        const res = await clientApi.categoryShow();
        setDataCate(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataCate();
  }, []);
  // End Get Category

  // Data NavBar
  const nav = [
    // {
    //   name: "Menu",
    //   path: "/menu",
    //   icon: <HiOutlineUserGroup />,
    //   cate: "",
    // },
    {
      name: "User",
      path: "/",
      icon: <HiOutlineUserGroup />,
      cate: "",
    },
    {
      name: "Product",
      path: "/product",
      icon: <MdOutlineSmartToy />,
      cate: <SubNavBar dataCate={dataCate} name="category" />,
    },
    {
      name: "Category",
      path: "/category",
      icon: <BiCategoryAlt />,
      cate: "",
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <FaMicroblog />,
      cate: <SubNavBar dataCate={getListBlog} name="bloglist" />,
    },
    {
      name: "listblog",
      path: "/listblog",
      icon: <BiListOl />,
      cate: "",
    },
    {
      name: "Mail",
      path: "/mail",
      icon: <BiMailSend />,
      cate: "",
    },
    {
      name: "News",
      path: "/news",
      icon: <FaRegNewspaper />,
      cate: "",
    },
  ];
  // End Data NavBar
  return (
    <>
      <div className="flex flex-col ">
        <div className="p-5 text-[1.5rem] font-semibold tracking-widest dark:text-[#fff] text-[black]">
          Dashboard
        </div>
        <div className="px-5 flex flex-row justify-center items-center mt-3">
          <img
            onClick={() => show()}
            src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
            alt=""
            className="w-[2.25rem] h-[2.25rem] rounded-[50%] mr-5 cursor-pointer"
          />
          {user ? (
            <div className="dark:text-[#fff] text-[black] font-normal">
              {user.user.name}
            </div>
          ) : (
            <div> Login</div>
          )}
        </div>
        <div>
          <ul className="dark:text-[white] mt-5">
            {nav.map((item, index) => (
              <Link to={item.path} key={index}>
                <li
                  onClick={(e, i) => handleActive(e, index)}
                  className="menu flex flex-row items-center px-5 py-1 hover:bg-bgButton w-[90%] rounded-br-3xl rounded-tr-3xl hover:text-[#fff] border-l-4 border-[#fefce8] dark:border-[black] hover:border-[#fce355fb] dark:hover:border-[#fce355fb] cursor-pointer"
                >
                  <span className="p-2 rounded-[50%] dark:bg-[#135d26]  bg-[#f5eec8f6] dark:text-[#fff] text-[#333] mr-3 flex justify-center items-center">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </li>
                <ul id={index} className="hidden">
                  {item.cate}
                </ul>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
