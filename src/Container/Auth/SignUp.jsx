import React from "react";
import { registerUser } from "../../app/apiRequest";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signin = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
        name: Yup.string()
            .required("Bắt buộc")
            .min(4, "Tên người dùng phải hơn 4 kí tự"),
        email: Yup.string()
            .required("Bắt buộc")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Email không hợp lệ"
            ),
        password: Yup.string()
            .required("Bắt buộc")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                "Mật khẩu phải trên 8 kí tự, bao  gồm chữ in hoa và kí tự đặc biệt"
            ),
        c_password: Yup.string()
            .required("Bắt buộc")
            .oneOf([
                Yup.ref("password"),
                null,
                "Mật khẩu không khớp, vui lòng nhập lại",
            ]),
    onSubmit: (values) => {
      alert("adsdasd");
      registerUser(values, dispath, navigate);
    }})
  });
  return (
    <div>
      <div className="border-[1px] border-[#808080] shadow-lg mx-auto w-[50%] mt-5 py-10 px-5 rounded-3xl">
        <h1 className="text-center text-3xl font-bold mb-8">SigUp</h1>
        <form
          className="flex flex-col  px-3 gap-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex justify-start items-center gap-4">
            <label className="font-semibold text-[14px]"> Your name </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter your name"
              className=" bg-[#E5E4E2] rounded-lg placeholder-slate-400 p-2 placeholder:text-sm w-2/3"
            />
            {/* {formik.errors.name && (
                            <p className="text-[red] text-[10px] italic">
                                {" "}
                                {formik.errors.name}{" "}
                            </p>
                        )} */}
          </div>
          <div className="flex justify-start items-center gap-4">
            <label className="font-semibold text-[14px]"> Email address </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              className=" bg-[#E5E4E2] rounded-lg placeholder-slate-400 p-2 placeholder:text-sm w-2/3"
            />
            {/* {formik.errors.email && (
                            <p className="text-[red] text-[10px] italic">
                                {" "}
                                {formik.errors.email}{" "}
                            </p>
                        )}   */}
          </div>
          <div className="flex justify-start items-center gap-4">
            <label className="font-semibold text-[14px]"> Password </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              className=" rounded-lg bg-[#E5E4E2] placeholder-slate-400 p-2 placeholder:text-sm w-2/3"
            />
            {/* {formik.errors.password && (
                            <p className="text-[red] text-[10px] italic">
                                {" "}
                                {formik.errors.password}{" "}
                            </p>
                        )} */}
          </div>
          <div className="flex justify-start items-center gap-4">
            <label className="font-semibold text-[14px]">
              {" "}
              Confirm Password{" "}
            </label>
            <input
              type="text"
              id="confirmedPassword"
              name="password_confirmation"
              value={formik.values.confirmedPassword}
              onChange={formik.handleChange}
              placeholder="Confirm your password"
              className=" bg-[#E5E4E2] rounded-lg placeholder-slate-400 p-2 placeholder:text-sm w-2/3"
            />
            {/* {formik.errors.confirmedPassword && (
                            <p className="text-[red] text-[10px] italic">
                                {" "}
                                {formik.errors.confirmedPassword}{" "}
                            </p>
                        )} */}
          </div>
          <button
            type="submit"
            className="py-2 mt-3 w-1/2 mx-auto rounded-xl mb-4 bg-secondary text-[white] hover:bg-primary"
          >
            Register
          </button>
        </form>
        <div className="flex justify-end px-5">
          <Link to="/signin">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
