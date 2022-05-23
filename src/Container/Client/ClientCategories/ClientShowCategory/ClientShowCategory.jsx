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
import { convertViToEn, urlImg } from "../../../../Component/Variable";
import "react-toastify/dist/ReactToastify.css";
import "../../ClientProducts/ClientProduct/ClientProduct.css";
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
  boxShadow: 24,
};
// End Style Modal show detail

const ClientShowCategory = () => {
  const [render, setRender] = useState(false);
  // input search
  const [open, setOpen] = useState(false);
  const [dataNew, setDataNew] = useState(null);
  const [categoryById, setCategoryById] = useState(null);
  const [getCategory, setGetCategory] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  const dispath = useDispatch();
  const navigate = useNavigate();

  const notify = (type = "success", content = "Cập nhật thành công!") =>
    toast[type](content);
  // -----------------------

  const handleEdit = (e, id) => {
    navigate(`/category/edit/${id}`);
  };

  // show Detail
  const handleOpen = (id) => {
    const getCategoryDetail = async () => {
      try {
        const res = await clientApi.categoryShowById(id);
        setCategoryById(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryDetail();
    setOpen(true);
  };
  const handleClose = () => {
    setCategoryById(null);
    setOpen(false);
  };
  // End show Detail

  // get data category

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await clientApi.categoryShow();
        setGetCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [render]);
  // End data category

  // delete category

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await clientApi.categoryDelete(id);
        notify("success", "Xóa danh mục thành công!");
        setRender(!render);
      } catch (error) {
        notify("error", "Xóa danh mục thất bại!");
      }
    };
    remove();
  };
  // End delete category

  // -------

  // ---------------------------------------------

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search category
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        if (getCategory) {
          await getCategory?.forEach((item, i) => {
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
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/category/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7">
        {/* Table show category */}
        <table className="w-full text-bgButton font-semibold ">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>

          {/* show data Category */}
          {getCategory ? (
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
                      to={`/category/edit/${item.id}`}
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
                getCategory?.map((item) => (
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
                        to={`/category/edit/${item.id}`}
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="w-[70%] break-words"
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

          {/* <tfoot>
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
          </tfoot> */}
          {/* End show data category */}
        </table>

        {/* End table show category */}

        {/* Show Detail Blog */}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {categoryById ? (
            <Box sx={style}>
              <div className="flex flex-col px-10 py-16 h-[600px] overflow-y-scroll gap-5">
                <div className="flex flex-row gap-5 ">
                  <div className="w-[40%]">
                    <img
                      src={urlImg + categoryById?.photo}
                      alt=""
                      className="w-full h-[200px] border-[1px] border-[#333]"
                    />
                  </div>
                  <div className="w-[60%] flex flex-col gap-3">
                    <div>
                      <h2 className="text-2xl font-medium">
                        {categoryById?.title}
                      </h2>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: categoryById?.description,
                        }}
                        className="text-md font-normal italic text-[#777] "
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

        {/*End Show Detail Category */}
      </div>
      <ToastContainer />
    </>
  );
};

export default ClientShowCategory;
