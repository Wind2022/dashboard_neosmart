import React from "react";
import { useSelector } from "react-redux";

const ClientHome = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userCurrent = [user.user];
  const getuser = localStorage.getItem("role");
  return (
    <>
      {userCurrent.map((item) => (
        <div
          key={item.id}
          className="dark:text-lightSecondary flex flex-col gap-10"
        >
          <h3 className="text-2xl">Xin chào - {item.name}</h3>
          <p>Email : {item.email}</p>
          {item.role == 1 ? <p className="text-xl">admin</p> : <p>user</p>}
          <p>
            Ngày tạo tài khoản :{" "}
            {new Date(item.created_at).toLocaleDateString("vi-VI")}
          </p>
        </div>
      ))}
    </>
  );
};

export default ClientHome;
