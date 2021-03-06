import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinearProgress } from "@mui/material";

import { clientApi } from "../../../../api/api";
import {
  getProductByCategory,
  getProductById,
} from "../../../../app/apiRequest";
import { getAllProductSuccess } from "../../../../app/productSlice/productsSlice";
import { convertViToEn, urlImg } from "../../../../Component/Variable";
import ButtonAdd from "../../../../Component/Button/ButtonAdd";
import InputSearch from "../../../../Component/Input/InputSearch";
import ButtonSwitch from "../../../../Component/Button/ButtonSwitch";
import ButtonActions from "../../../../Component/Button/ButtonActions";
import ClientPagination from "../../../../Component/Pagination/ClientPagination";
import SkeletonTable from "../../../../Component/Skeleton/SkeletonTable";
import { callApi } from "../../../../config/configApi";
import SkeletonDetailProduct from "../../../../Component/Skeleton/SkeletonDetailProduct";

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

const ClientCategory = () => {
  let { id } = useParams();

  const [render, setRender] = useState(false);
  const [currentIdCategory, setCurrentIdCategory] = useState();
  const [dataProduct, setDataProduct] = useState([]);
  const [getProductByCategoryId, setGetProductByCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const dispath = useDispatch();
  const [dataNew, setDataNew] = useState(null);
  const [productById, setProductById] = useState(null);
  const  [dataCategory, setDateCategory] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current_page: 0,
    to: 10,
    totalRows: 18,
    totalPages: 1,
  });
  //  End pagination

  const [filter, setFilter] = useState({
    current_page: 0,
    to: 10,
  });
  const notify = (
    type = "success",
    content = "C???p nh???t hi???n th??? th??nh c??ng!"
  ) => toast[type](content);
  
  const currentCategory = useSelector(
    (state) => state.category.category.currentCategory
  );
  const productByCateId = useSelector(
    (state) => state.products.product.productByCateId
  );

  useEffect(() => {
    const getDataCategory = async () => {
      try {
        const res = await clientApi.categoryShow()
        setDateCategory(res.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    getDataCategory()
  }, [render])

  // show Detail
  const handleOpen = (id) => {
    const getProductDetail = async () => {
      try {
        const res = await clientApi.productShowById(id);
        setProductById(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetail();
    setOpen(true);
  };
  const handleClose = () => {
    setProductById(null);
    setOpen(false);
  };
  // End show Detail

  // Pagination
  useEffect(() => {
    const getProductByCategoryPagination = async () => {
      try {
        setCurrentIdCategory(id);
        if (currentIdCategory !== id) {
          setGetProductByCategoryId(null);
        }
        const res = await clientApi.productPaginationByCategoryId(
          id,
          filter.current_page,
          filter.to
        );
        const result = res.data.result;
        setGetProductByCategoryId(result.data);
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
    getProductByCategoryPagination();
  }, [id, filter]);

  const handlePageChange = (newPage, rowsPerPage) => {
    setFilter({
      ...filter,
      current_page: newPage,
      to: rowsPerPage,
    });
  };
  // End Pagination

  // get data Product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await clientApi.productShow();
        setDataProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [render]);
  // End data Product
  // ------------------------------------

  const handleEdit = (e, id) => {
    navigate(`/product/category/edit/id=${id}`);
  };

  // -------

  // Handle display
  const handleDisplay = (e, product) => {
    // On off button display
    const check = e.target.checked;
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id == product.id) {
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
        await clientApi.productEdit(id, data);
        notify();
      } catch (error) {
        notify("error", "C???p nh???t th???t b???i!");
      }
    };
    const dataDisplay = new FormData();
    dataDisplay.append("title", product.title);
    dataDisplay.append("photo", product.photo);
    dataDisplay.append("price", product.price);
    dataDisplay.append("detail", product.detail);
    dataDisplay.append("content", product.content);
    dataDisplay.append("description", product.description);
    dataDisplay.append("position", product.position);
    if (check) {
      dataDisplay.append("display", 1);
      updateDisplay(product.id, dataDisplay);
    } else {
      dataDisplay.append("display", 0);
      updateDisplay(product.id, dataDisplay);
    }
    // End Update display
  };
  // End handle display

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        const res = productByCateId[0]?.forEach((item, i) => {
          if (convertViToEn(item.title).includes(convertViToEn(value), 0)) {
            return dataSearch.push(item);
          }
        });
        setDataNew(dataSearch);
        if (value == "") {
          setDataNew([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [value]);

  // delete Product

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await clientApi.productDelete(id);
        notify("success", "X??a s???n ph???m th??nh c??ng!");
        setRender(!render);
      } catch (error) {
        notify("error", "X??a s???n ph???m th???t b???i!");
        console.log(error);
      }
    };
    remove();
    console.log("delete");
  };
  // End delete Product
  return (
    <>
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/product/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show product */}
        <table className="w-full text-bgButton font-semibold">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Display</td>
              <td>Position</td>
              <td>Category</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Product */}
          {getProductByCategoryId ? (
            <tbody className="text-[#333] dark:text-[#fff] font-light">
              {value !== ""
                ? dataNew?.map((item) => (
                    <tr key={item.id} className="dark:hover:hoverButton">
                      <td className="flex flex-row justify-start gap-2 w-40 items-center">
                        <img
                          src={urlImg + item.photo}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                        <Link
                          to={`/product/category/edit/id=${item.id}`}
                          className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal tb:text-xs dt:text-base"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></td>
                      <td>
                        {Intl.NumberFormat().format(Number(item.price))} VN??
                      </td>

                      {/* switched display */}
                      <td>
                        <ButtonSwitch
                          id={item.id}
                          name={item.display}
                          handleChange={(e, id) => handleDisplay(e, item.id)}
                        />
                      </td>
                      {/* End switched display */}

                      <td>{item.position}</td>

                      {dataCategory?.map((cate) =>
                        item.category_id == cate.id ? (
                          <td key={cate.id}>{cate.title}</td>
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
                  ))
                : getProductByCategoryId?.map((item) => (
                    <tr key={item.id} className="dark:hover:hoverButton">
                      <td className="flex flex-row justify-start gap-2 items-center">
                        <img
                          src={urlImg + item.photo}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                        <Link
                          to={`/product/category/edit/id=${item.id}`}
                          className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></td>
                      <td>
                        {Intl.NumberFormat().format(Number(item.price))} VN??
                      </td>

                      {/* switched display */}
                      <td>
                        <ButtonSwitch
                          id={item.id}
                          name={item.display}
                          handleChange={(e, product) => handleDisplay(e, item)}
                        />
                      </td>
                      {/* End switched display */}

                      <td>{item.position}</td>

                      {dataCategory?.map((cate) =>
                        item.category_id == cate.id ? (
                          <td key={cate.id}>{cate.title}</td>
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
                    id={id}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
          {/* End show data product */}
        </table>

        {/* End table show product */}

        {/* Show Detail Blog */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {productById ? (
            <Box sx={style}>
              <div className="flex flex-col px-10 py-16 gap-5">
                <div className="flex flex-row gap-5 ">
                  <div className="w-[40%]">
                    <img
                      src={urlImg + productById?.photo}
                      alt=""
                      className="w-full h-[200px] border-[1px] border-[#333]"
                    />
                  </div>
                  <div className="w-[60%] flex flex-col gap-3">
                    <div>
                      <h2 className="text-2xl font-medium">
                        {productById?.title}
                      </h2>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: productById?.description,
                        }}
                        className="text-md font-normal italic text-[#777]"
                      ></span>
                    </div>
                    <div>
                      <span>Gi??: </span>
                      <strong className="text-[#ff6363] text-xl font-medium">
                        {Intl.NumberFormat().format(Number(productById?.price))}{" "}
                        VN??
                      </strong>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productById?.detail,
                      }}
                    ></div>
                    <p></p>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: productById?.content }}
                  className="text-lg font-light text-[#000]"
                ></div>
              </div>
            </Box>
          ) : (
            <SkeletonDetailProduct style={style} />
          )}
        </Modal>

        {/*End Show Detail Blog */}
      </div>
      <ToastContainer />
    </>
  );
};

export default ClientCategory;
