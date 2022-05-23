import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineSmartToy } from "react-icons/md";
import { BiCategory, BiMailSend } from "react-icons/bi";
import { FaMicroblog, FaUserFriends } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";

const nav = [
    {
        path: "/menu",
        icon: <CgMenuGridR />,
    },
    {
        path: "/user",
        icon: <HiOutlineUserGroup />,
    },
    {
        path: "/product",
        icon: <MdOutlineSmartToy />,
    },
    {
        path: "/category",
        icon: <BiCategory />,
    },
    {
        path: "/blog",
        icon: <FaMicroblog />,
    },
    {
        path: "/mail",
        icon: <BiMailSend />,
    },
];

const NavBarClose = () => {
    const handleActive = (e) => {
        const elementLi = document.querySelectorAll("li");
        elementLi.forEach((li) => {
            li.classList.remove("active");
        });
        e.target.closest(".menu").classList.toggle("active");
    };
    return (
        <>
            <div className="flex flex-col  h-full  bg-lightSecondary dark:bg-nightSecondary  justify-start transition-all">
                <div className="py-9  text-[1.5rem] opacity-0 font-semibold tracking-widest dark:text-[#fff] text-[black]"></div>
                <div className="px-5 flex flex-row justify-center items-center mt-3">
                    <img
                        src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
                        alt=""
                        className="w-[2.25rem] h-[2.25rem] rounded-[50%] mr-5 cursor-pointer"
                    />
                </div>
                <div>
                    <ul className="dark:text-[white] mt-5 flex flex-col justify-center">
                        {nav.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <li
                                    onClick={(e) => handleActive(e)}
                                    className="menu flex flex-row items-center px-3 py-1 hover:bg-bgButton w-[90%] rounded-br-3xl rounded-tr-3xl hover:text-[#fff] border-l-4 border-[#fefce8] dark:border-[black] hover:border-[#fce355fb] dark:hover:border-[#fce355fb] cursor-pointer"
                                >
                                    <span className="p-2 rounded-[50%] dark:bg-[#135d26]  bg-[#f5eec8f6] dark:text-[#fff] text-[#333] mr-3 flex justify-center items-center">
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBarClose;
