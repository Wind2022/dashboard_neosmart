import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";

import { clientApi } from "../../../../api/api";
import InputSearch from "../../../../Component/Input/InputSearch";
import ButtonActions from "../../../../Component/Button/ButtonActions";
import ButtonAdd from "../../../../Component/Button/ButtonAdd";
import { urlImg } from "../../../../Component/Variable";
import "react-toastify/dist/ReactToastify.css";
import "../../ClientProducts/ClientProduct/ClientProduct.css";
import SkeletonTable from "../../../../Component/Skeleton/SkeletonTable";
import SkeletonDetail from "../../../../Component/Skeleton/SkeletonDetail";
import axios from "axios";

// Style Modal show detail
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
// End Style Modal show detail

const ClientShowListBlogs = () => {
  const [render, setRender] = useState(false);
  // input search
  const [open, setOpen] = useState(false);
  const [dataNew, setDataNew] = useState(null);
  const [listBlogById, setListBlogById] = useState(null);
  const [getListBlog, setGetListBlog] = useState(null);
  const user = useSelector((state) => state.auth.login?.currentUser);
  //  value input search
  const [value, setValue] = useState();
  const dispath = useDispatch();
  const navigate = useNavigate();

  const notify = (type = "success", content = "Cập nhật thành công!") =>
    toast[type](content);
  // -----------------------

  const handleEdit = (e, id) => {
    navigate(`/listblog/edit/${id}`);
  };

  // show Detail
  const handleOpen = (id) => {
    const getListBlogDetail = async () => {
      try {
        const res = await clientApi.listBlogShowById(id);
        setListBlogById(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListBlogDetail();
    setOpen(true);
  };
  const handleClose = () => {
    setListBlogById(null);
    setOpen(false);
  };
  // End show Detail

  // get data list blog
  useEffect(() => {
    const getListBlog = async () => {
      try {
        const res = await clientApi.listBlogShow();
        setGetListBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListBlog();
  }, [render]);
  // End data list blog

  // delete list blog

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await clientApi.listBlogDelete(id);
        notify("success", "Xóa danh mục thành công!");
        setRender(!render);
      } catch (error) {
        notify("error", "Xóa danh mục thất bại!");
      }
    };
    remove();
  };
  // End delete list blog

  // -------

  // ---------------------------------------------

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search list
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        if (getListBlog) {
          await getListBlog?.forEach((item, i) => {
            if (value !== "") {
              if (
                item.title.toLowerCase().includes(value.trim().toLowerCase(), 0)
              ) {
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
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/listblog/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className=" w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7">
        {/* Table show category */}
        <table className="w-full text-bgButton font-semibold ">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>

          {/* show data list blog */}
          {getListBlog ? (
            <tbody className="text-[#333] dark:text-[#fff] font-light overflow-y-auto ">
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
                      onClick={(e, id) => handleEdit(e, item.id)}
                      to={`/listblog/edit/${item.id}`}
                      className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></td>

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
                getListBlog?.map((item) => (
                  <tr key={item.id} className="dark:hover:bg-hoverButton">
                    <td className="flex flex-row justify-start gap-2 items-center">
                      <img
                        src={urlImg + item.photo}
                        alt=""
                        width="50px"
                        height="50px"
                      />
                      <Link
                        onClick={(e, id) => handleEdit(e, item.id)}
                        to={`/listblog/edit/${item.id}`}
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></td>

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
        </table>

        {/* End table show ListBlog */}

        {/* Show Detail Blog */}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {listBlogById ? (
            <Box sx={style}>
              <div className="flex flex-col px-10 py-16 h-[600px] overflow-y-scroll gap-5">
                <div className="flex flex-row gap-5 ">
                  <div className="w-[40%]">
                    <img
                      src={urlImg + listBlogById?.photo}
                      alt=""
                      className="w-full h-[200px] border-[1px] border-[#333]"
                    />
                  </div>
                  <div className="w-[60%] flex flex-col gap-3">
                    <div>
                      <h2 className="text-2xl font-medium">
                        {listBlogById?.title}
                      </h2>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: listBlogById?.description,
                        }}
                        className="text-md font-normal italic text-[#777]"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          ) : (
            <SkeletonDetail style={style} />
          )}
        </Modal>

        {/*End Show Detail listBlog */}
      </div>
      <ToastContainer />
    </>
  );
};

export default ClientShowListBlogs;
