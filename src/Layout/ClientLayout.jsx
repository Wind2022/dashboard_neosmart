import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../app/authSlice";
import NavBar from "../Component/NavBar";
import "./ClientLayout.css";
import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
import NavBarClose from "../Component/NavBarClose";

export default function ClientLayout() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = axios.create();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const containerNav = useRef();
  const container = useRef();
  const [show, setShow] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const setUrl = async () => {
      try {
        const currentUrl = await sessionStorage.getItem("currentUrl");
        navigate(currentUrl);
      } catch (error) {
        console.log(error);
      }
    };
    setUrl();
  }, []);
  useEffect(() => {
    console.log(location);
    location && sessionStorage.setItem("currentUrl", location.pathname);
  }, [location]);

  const handleShow = () => {
    setShow(!show);
  };

  // handle responsive navBar
  const handleShowRespon = (e) => {
    containerNav.current.classList.add("show");
    container.current.classList.add("backgound");
  };
  const handleHideRespon = (e) => {
    if (e.target == e.currentTarget) {
      containerNav.current.classList.remove("show");
      container.current.classList.remove("backgound");
    }
  };
  // end
  const refreshToken = async () => {
    try {
      const urlRefresh = "http://localhost:8000/api/auth/refresh";
      const res = await axios.post(urlRefresh, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.access_token);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          access_token: data.access_token,
        };
        dispath(loginSuccess(refreshUser));
        localStorage.setItem("token", data.access_token);
        config.headers["token"] = "Bearer" + data.access_token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user.user.role == 1) {
      navigate("/");
    } else {
      alert("you are dont permision");
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="overflow-x-hidden w-full flex flex-row transition-all dark:bg-nightSecondary bg-lightSecondary">
        <div
          className="z-[9999] dt:static tb:fixed dt:bg-local"
          ref={container}
          onClick={(e) => {
            handleHideRespon(e);
          }}
        >
          <div
            className=" flex min-h-full tb:hidden dt:flex bg-lightSecondary"
            ref={containerNav}
          >
            <div className="transition-all ">
              {!show ? <NavBar /> : <NavBarClose />}
            </div>
            <div className=" cursor-pointer w-[25px]  flex justify-start items-start ">
              {!show ? (
                <RiMenuFoldFill
                  className="text-hoverButton dark:text-secondary text-5xl mt-3 dt:block tb:hidden"
                  onClick={handleShow}
                />
              ) : (
                <RiMenuUnfoldFill
                  className="text-hoverButton dark:text-secondary text-5xl mt-3 dt:block tb:hidden"
                  onClick={handleShow}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="py-[1.25rem] px-[1.5rem] dark:bg-nightSecondary bg-lightSecondary">
            <Header handleShowRespon={handleShowRespon} />
          </div>
          <div className=" min-h-screen p-7 dark:bg-[black] dark:border-[1px] bg-lightPrimary">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
