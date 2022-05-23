import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllMessage } from "../../../app/apiRequest";
import { getMessageById } from "../../../app/apiRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinearProgress } from "@mui/material";

import "../ClientProducts/ClientProduct/ClientProduct.css";
import InputSearch from "../../../Component/Input/InputSearch";
import ButtonActions from "../../../Component/Button/ButtonActions";
import { clientApi } from "../../../api/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SkeletonTable from "../../../Component/Skeleton/SkeletonTable";
import { convertViToEn } from "../../../Component/Variable";
import ClientPagination from "../../../Component/Pagination/ClientPagination";
import { socket } from "../../../Component/Variable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "#fff",
  border: "none",
  boxShadow: 24,
};

const ClientMail = () => {
  const [open, setOpen] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const getMailDetail = useSelector(
    (state) => state.message.message.messageById
  );
  const [render, setRender] = useState(false);
  // -------------------
  const [getMessage, setGetMessage] = useState(null);

  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState("");
  const notify = (type = "success", content = "Đã xử lý") =>
    toast[type](content);
  const handleOpen = (id) => {
    getMessageById(dispath, id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // pagination
  const [pagination, setPagination] = useState({
    current_page: 0,
    to: 10,
    totalRows: 18,
    totalPages: 2,
  });
  const [filter, setFilter] = useState({
    current_page: 1,
    to: 10,
  });

  useEffect(() => {
    const getMessagePagination = async () => {
      try {
        const res = await clientApi.messagePagination(
          filter.current_page,
          filter.to
        );
        const result = res.data;
        setGetMessage(result.data);
        setPagination({
          ...pagination,
          to: result.to,
          totalRows: result.total,
          totalPages: result.last_page,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMessagePagination();
  }, [filter, render]);

  const handlePageChange = (newPage, rowsPerPage) => {
    setFilter({
      ...filter,
      current_page: newPage,
      to: rowsPerPage,
    });
  };
  //  End pagination

  // ---------------------------------------------

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];

        getMessage?.forEach((item, i) => {
          if (convertViToEn(item.email).includes(convertViToEn(value), 0)) {
            return dataSearch.push(item);
          }
        });

        setDataNew(dataSearch);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [value]);

  // Update status

  useEffect(() => {
    socket.on("message", (data) => {
      setTimeout(() => {
       setRender(!render)
      }, 600);
    });
  });

  const updateStatus = async (id, status) => {
    try {
      await clientApi.messageUpdateStatus(id, status);
      socket.emit("message", "update");
      notify();
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  // End Update status

  const handleSeen = (id) => {
    updateStatus(id, { status: 1 });
   
  };
  return (
    <>
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show product */}
        <table className="w-full text-bgButton  font-semibold">
          <thead>
            <tr>
              <td>Email</td>
              <td>Message</td>
              <td>Status</td>
              <td>Create_at</td>
              <td>Actions</td>
            </tr>
          </thead>

          {/* show data Mail */}
          {getMessage ? (
            <tbody className="text-[#333] dark:text-[#fff] font-light">
              {value != "" ? (
                // Check value search
                dataNew != "" ? (
                  dataNew?.map((item) => (
                    <tr key={item.id} className="dark:hover:bg-hoverButton">
                      <td className="flex flex-row justify-start gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-xl font-normal">
                            {item.fullname}
                          </span>
                          <p className="text-[#777777a7] dark:text-[#ffffff90]">
                            {item.email}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="w-80 truncate">{item.message}</p>
                      </td>
                      <td>{item.status == 0 ? "Chưa xử lý" : "Đã xử lý"}</td>
                      {/* End switched display */}

                      <td>
                        {new Date(item.created_at).toLocaleDateString("vi-VI")}{" "}
                        {new Date(item.created_at).toLocaleTimeString("vi-VI")}
                      </td>
                      <td>
                        <ButtonActions
                          id={item.id}
                          handleSeen={(id) => handleOpen(item.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Không tìm thấy
                    </td>
                  </tr>
                )
              ) : (
                // Show List Message
                getMessage?.map((item) => (
                  <tr
                    // style={
                    //   item.status == 0 ? { backgroundColor: "#f5eec8" } : {}
                    // }

                    key={item.id}
                    className="dark:hover:bg-hoverButton"
                  >
                    <td className="flex flex-row justify-start gap-2 items-center">
                      <div className="flex flex-col">
                        <span className="text-xl font-normal">
                          {item.fullname}
                        </span>
                        <p className="text-[#777777a7] dark:text-[#ffffff90]">
                          {item.email}
                        </p>
                      </div>
                    </td>
                    <td>
                      <p className="w-80 truncate">{item.message}</p>
                    </td>
                    <td
                      style={
                        item.status == 0 ? { color: "red" } : { color: "black" }
                      }
                    >
                      {item.status == 0 ? "Chưa xử lý" : "Đã xử lý"}
                    </td>
                    {/* End switched display */}

                    <td>
                      {new Date(item.created_at).toLocaleDateString("vi-VI")}{" "}
                      {new Date(item.created_at).toLocaleTimeString("vi-VI")}
                    </td>
                    <td>
                      <ButtonActions
                        id={item.id}
                        handleSeen={(id) => handleOpen(item.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          ) : (
            <SkeletonTable rows={4} columns={3} />
          )}

          <tfoot>
            <tr className="shadow-none">
              <td colSpan="7">
                <div className="flex flex-row justify-end">
                  <ClientPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              </td>
            </tr>
          </tfoot>

          {/* End show data product */}
        </table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {getMailDetail ? (
            <Box sx={style}>
              <div className="flex flex-col">
                <div className="header-message flex flex-row justify-between items-center p-3">
                  <div>
                    <h3 className="text-xl font-medium">
                      {getMailDetail[0]?.fullname}
                    </h3>
                    <p className="text-[#666] italic">
                      {getMailDetail[0]?.email}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#777] text-sm italic">
                      {new Date(
                        getMailDetail[0]?.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="content-message border-y-[1px] border-[#33333324] p-3 text-left">
                  <p className="font-light text-base ">
                    {getMailDetail[0]?.message}
                  </p>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <button
                    onClick={(id) => {
                      handleSeen(getMailDetail[0].id);
                      handleClose();
                    }}
                    className="inline-block p-2 bg-bgButton text-[#fff] hover:bg-hoverButton shadow-md rounded-sm"
                  >
                    Đã xử lý
                  </button>
                  <div>
                    <span className="font-normal">Phone:</span>
                    <a
                      className="inline-block ml-2 text-lg font-medium hover:text-[#d75757]"
                      href={`tel:+${getMailDetail[0]?.phone_number}`}
                    >
                      {getMailDetail[0]?.phone_number}
                    </a>
                  </div>
                </div>
              </div>
            </Box>
          ) : null}
        </Modal>
        {/* End table show product */}
      </div>
      <ToastContainer />
    </>
  );
};
export default ClientMail;
