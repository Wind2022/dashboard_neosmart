import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { clientApi } from "../../../api/api";
import ChartPie from "../../../Component/Chart/ChartPie/ChartPie";
import ChartBar from "../../../Component/Chart/ChartBar/ChartBar";

ChartJS.register(ArcElement, Tooltip, Legend);

const ClientHome = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userCurrent = [user.user];
  const getuser = localStorage.getItem("role");
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await clientApi.categoryShow();
        const product = await clientApi.productShow();
        const blog = await clientApi.blogShow();
        setProduct(product.data);
        setCategory(res.data);
        setBlog(blog.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const data = [
    { value: product.length * 100, name: "Product" },
    { value: category.length * 100, name: "Category" },
    { value: blog.length * 100, name: "Blog" },
  ];
  return (
    <>
      {userCurrent.map((item) => (
        <div
          key={item.id}
          className="dark:text-lightSecondary flex flex-col gap-10"
        >
          <h3 className="text-2xl">Xin chào - {item.name}</h3>
          <div className="flex flex-row ">
            <ChartPie data={data} />
            <ChartBar data={data} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientHome;
