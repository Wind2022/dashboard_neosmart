import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component Button
import { convertViToEn, urlImg } from "../../../../Component/Variable";
import InputSearch from "../../../../Component/Input/InputSearch";
import ButtonActions from "../../../../Component/Button/ButtonActions";
import ButtonSwitch from "../../../../Component/Button/ButtonSwitch";
import ButtonAdd from "../../../../Component/Button/ButtonAdd";

import { clientApi } from "../../../../api/api";
import ClientPagination from "../../../../Component/Pagination/ClientPagination";
import SkeletonTable from "../../../../Component/Skeleton/SkeletonTable";
import SkeletonDetail from "../../../../Component/Skeleton/SkeletonDetail";

// Style Modal show detail
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "#fff",
  border: "none",
  borderRadius: 1,
  boxShadow: 24,
};
// End Style Modal show detail

const ClientShowNews = () => {
  const [render, setRender] = useState(false);

  // -------------------
  // input search
  const [data, setData] = useState([]);

  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState("");
  // -----------------------
  const [open, setOpen] = useState(false);
  const [newsById, setNewsById] = useState([]);
  const [listNews, setListNews] = useState(null);
  const [getNews, setGetNews] = useState(null);
  // pagination
  const [pagination, setPagination] = useState({
    current_page: 0,
    to: 10,
    totalRows: 10,
    totalPages: 1,
  });
  //  End pagination

  const [filter, setFilter] = useState({
    current_page: 0,
    to: 10,
  });

  const dispath = useDispatch();
  const navigate = useNavigate();

  const notify = (
    type = "error",
    content = "Cập nhật hiển thị không thành công!"
  ) => toast[type](content);

  useEffect(() => {
    const getNewsPagination = async () => {
      try {
        const res = await clientApi.blogPagination(
          filter.current_page,
          filter.to
        );
        const result = res.data.result;
        setGetNews(result.data);
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
    getNewsPagination();
  }, [filter, render]);

  useEffect(() => {
    const getListNews = async () => {
      try {
        const res = await clientApi.listBlogShow();
        setListNews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListNews();
  }, [render]);

  const handlePageChange = (newPage, rowsPerPage) => {
    setFilter({
      ...filter,
      current_page: newPage,
      to: rowsPerPage,
    });
  };

  // show Detail
  const handleOpen = (id) => {
    const getNewsById = async () => {
      try {
        const res = await clientApi.blogPagination(id);
        setNewsById(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewsById();
    setOpen(true);
  };
  const handleClose = () => {
    setNewsById(null);
    setOpen(false);
  };
  // End show Detail

  const handleEdit = (e, id) => {
    navigate(`/News/edit/id=${id}`);
  };
  // getNews
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await clientApi.blogShow();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, [render]);

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await clientApi.blogDelete(id);
        setRender(!render);
        notify("success", "Xóa bài viết thành công!");
      } catch (error) {
        notify("error", "Xóa sản phẩm thất bại!");
      }
    };
    remove();
  };

  // Handle display
  const handleDisplay = (e, News) => {
    // On off button display
    const check = e.target.checked;
    console.log(check);
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id == News.id) {
        if (check) {
          item.style.transform = "translateX(125%)";
          spanElement.style.backgroundColor = "#0f8f31";
        } else {
          item.style.transform = "translateX(20%)";
          spanElement.style.backgroundColor = "#e64141";
        }
      }
    });

    // End On off button display

    // Update display
    const updateDisplay = async (id, data) => {
      try {
        await clientApi.blogDisplay(id, data);
        notify("success", "Cập nhật hiển thị thành công!");
      } catch (error) {
        notify();
      }
    };
    const dataDisplay = new FormData();
    if (check) {
      dataDisplay.append("display", 1);
      updateDisplay(News.id, dataDisplay);
    } else {
      dataDisplay.append("display", 0);
      updateDisplay(News.id, dataDisplay);
    }
    // End Update display
  };
  // End handle display

  // ---------------------------------------------

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        if (getNews) {
          await getNews?.forEach((item, i) => {
            if (value !== "") {
              if (convertViToEn(item.title).includes(convertViToEn(value), 0)) {
                return dataSearch.push(item);
              }
              setDataNew(dataSearch);
            } else {
              setDataNew(null);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [value]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/news/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="tb:overflow-x-scroll w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show  */}
        <table className="tb:w-[1000px] dt:w-full text-bgButton font-semibold">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Display</td>
              <td>Position</td>
              <td>List News</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data */}
          {getNews ? (
            <tbody className="text-[#333] dark:text-[#fff] font-light">
              {dataNew?.map((item) => (
                <tr key={item.id} className="dark:hover:bg-hoverButton">
                  <td className="flex flex-row justify-start gap-2 items-center">
                    <img
                      src={urlImg + item.photo}
                      alt=""
                      width="50px"
                      height="50px"
                    />
                    <Link
                      to={`/news/edit/id=${item.id}`}
                      className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal tb:text-xs dt:text-base"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></td>

                  <td>
                    <ButtonSwitch
                      id={item.id}
                      name={item.display}
                      handleChange={(e, News) => handleDisplay(e, item)}
                    />
                  </td>
                  {/* End switched display */}

                  <td>{item.position}</td>
                  {listNews?.map((News) =>
                    item.listNews_id == News.id ? (
                      <td key={News.id}>{News.title}</td>
                    ) : (
                      ""
                    )
                  )}

                  {/* Button delete */}
                  <td>
                    <ButtonActions
                      handleSeen={(id) => handleOpen(item.id)}
                      HandleDelete={(id) => handleRemove(item.id)}
                      handleEdit={(e, id) => handleEdit(e, item.id)}
                    />
                  </td>

                  {/* End button delete */}
                </tr>
              )) ??
                getNews?.map((item) => (
                  <tr key={item.id} className="dark:hover:bg-hoverButton">
                    <td className="flex flex-row justify-start gap-2 items-center">
                      <img
                        src={urlImg + item.photo}
                        alt=""
                        width="50px"
                        height="50px"
                      />
                      <Link
                        to={`/News/edit/id=${item.id}`}
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></td>

                    <td>
                      <ButtonSwitch
                        id={item.id}
                        name={item.display}
                        handleChange={(e, News) => handleDisplay(e, item)}
                      />
                    </td>
                    {/* End switched display */}

                    <td>{item.position}</td>
                    {listNews?.map((News) =>
                      item.listNews_id == News.id ? (
                        <td key={News.id}>{News.title}</td>
                      ) : (
                        ""
                      )
                    )}

                    {/* Button delete */}
                    <td>
                      <ButtonActions
                        handleSeen={(id) => handleOpen(item.id)}
                        HandleDelete={(id) => handleRemove(item.id)}
                        handleEdit={(e, id) => handleEdit(e, item.id)}
                      />
                    </td>

                    {/* End button delete */}
                  </tr>
                ))}
            </tbody>
          ) : (
            <SkeletonTable rows={10} columns={5} image={true} />
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
          {/* End show data  */}
        </table>

        {/* End table show  */}

        {/* Show Detail  */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {newsById ? (
            <Box sx={style}>
              <div className="flex flex-col px-10 py-16 gap-5 h-[600px] overflow-y-scroll">
                <div className="flex flex-col gap-5 ">
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={urlImg + newsById?.photo}
                      alt=""
                      className="w-[80%] h-[250px] rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="w-full flex flex-row gap-3 justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-4xl font-normal">
                        {newsById?.title}
                      </h2>
                    </div>
                    <div className="flex flex-col items-end">
                      <p>
                        {new Date(newsById?.created_at).toLocaleDateString(
                          "vi-VI"
                        )}
                      </p>
                      <p className="text-[#666] text-md font-light">
                        {new Date(newsById?.created_at).toLocaleTimeString(
                          "vi-VI"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: newsById?.description,
                    }}
                    className="text-md font-normal italic"
                  ></span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: newsById?.detail }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{ __html: newsById?.content }}
                ></div>
              </div>
            </Box>
          ) : (
            <SkeletonDetail style={style} />
          )}
        </Modal>

        {/* End show Detail  */}
      </div>
    </>
  );
};

export default ClientShowNews;
