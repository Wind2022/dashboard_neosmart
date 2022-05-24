import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../app/apiRequest";

import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

import logo from "../../assets/images/logo.png";

const Signin = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const refInterval = useRef(null);
  const userLoading = useSelector((state) => state.auth.login.isFetching);
  const [render, setRender] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (userLoading) {
      refInterval.current = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setTimeout(() => {
              navigate("/");
            }, 200);
          }
          const diff = Math.random() * 10;
          if (!userLoading) {
            return 100;
          } else {
            return Math.min(oldProgress + diff, 100);
          }
        });
      }, 50);
      return () => {
        clearInterval(refInterval.current);
      };
    }
  }, [render]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ"),
      password: Yup.string()
        .required("Bắt buộc")
        .matches(/^(?=.{6,})/, " Must Contain 6 Characters"),
    }),

    onSubmit: (values) => {
      loginUser(values, dispath, navigate);
      setRender(!render);
      setShowProgress(true);
    },
  });

  return (
    <>
      {showProgress && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: (theme) => theme.palette.grey[300],
              },
              [`& .${linearProgressClasses.bar}`]: {
                backgroundColor: "#2b8e84",
              },
            }}
          />
        </Box>
      )}
      <div className="min-h-screen flex flex-col gap-32">
        <h1 className="text-4xl font-medium text-[#33B3A6] text-center mt-10 underline uppercase">
          Administrator
        </h1>
        <div className="flex justify-evenly ">
          <div className="flex flex-col gap-10 mt-10 w-[30%]">
            <div>
              <img src={logo} alt="" />
            </div>
            <div>
              <h2 className=" text-[#33B3A6] font-bold text-xl">
                Nhà thông minh Neosmart
              </h2>
              <p className="text-[#2E2E2E] text-sm">
                Hệ thống nhà thông minh thế hệ mới nhất trên thế giới, công nghệ
                vượt trội so với các sản phẩm của Mỹ và Châu Âu - theo tiêu chí
                xếp hạng của Gartner
              </p>
            </div>
          </div>
          <div className=" shadow-2xl  w-[33%] h-[400px] rounded-xl flex flex-col  items-center">
            <form
              className="flex flex-col w-[80%] gap-8 mt-[40px]"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex justify-start items-center ">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="enter your email"
                  className=" bg-[white] shadow-2xl rounded-lg text-[#333]  focus:border-[2px] focus:border-[#1f9e91]  p-3 placeholder:text-sm w-full"
                />
              </div>
              <div className="flex gap-5  items-center ">
                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="enter your password"
                  className=" bg-[white] shadow-2xl rounded-lg text-[#333] placeholder-slate-400 p-3 focus:border-[2px] focus:border-[#1f9e91] placeholder:text-sm w-full"
                />
                {formik.errors.password && (
                  <p className="text-[red] text-[10px] italic">
                    {" "}
                    {formik.errors.password}{" "}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="py-2 mt-3 w-full mx-auto rounded-[4px] mb-4 bg-[#1f9e91] hover:bg-[#1abdad] text-[white] "
              >
                Login
              </button>
            </form>
            <hr className="w-[80%] mt-[40px] text-[#1f9e91]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
