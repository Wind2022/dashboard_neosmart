import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonUpload from "../../../../Component/Button/ButtonUpload";

import SkeletonEditProduct from "../../../../Component/Skeleton/SkeletonEditProduct";
import { clientApi } from "../../../../api/api";
import { getProductSuccess } from "../../../../app/productSlice/productsSlice";
import { urlImg } from "../../../../Component/Variable";
import ButtonCheck from "../../../../Component/Button/ButtonCheck";
import "./ClientEditProduct.css";
import { Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import BackButton from "../../../../Component/Button/BackButton";

const ClientEditProduct = () => {
  // getApi
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonSx = {
    ...(success
      ? {
          bgcolor: green[500],
          "&:hover": {
            bgcolor: green[700],
          },
        }
      : {
          bgcolor: "#0f8f31",
          "&:hover": {
            bgcolor: "#0e6726",
          },
        }),
  };
  // show Product Choose
  const [load, setLoad] = useState(false);
  // get File Image
  const [file, setFile] = useState();
  const [img, setImg] = useState(null);
  // get data edited
  const [stateValue, setStateValue] = useState({
    title: null,
    price: null,
  });
  const [des, setDes] = useState();
  const [detail, setDetail] = useState();
  const [content, setContent] = useState();
  const [display, setDisplay] = useState();
  const [position, setPosition] = useState();
  const editorRef = useRef(null);

  const [editPro, setEditPro] = useState(null);
  const dispath = useDispatch();
  const [getTheme, setGetTheme] = useState();
  const navigate = useNavigate();
  const notify = (type = "success", content = "Sửa sản phẩm thành công!") =>
    toast[type](content);
  const getChangeTheme = async () => {
    try {
      window.addEventListener("click", (e) => {
        setGetTheme(localStorage.getItem("theme"));
      });
    } catch (error) {
      console.log(error);
    }
  };
  getChangeTheme();

  // --------------------------------

  useEffect(() => {
    const getProductEdit = async () => {
      try {
        const res = await clientApi.productShowById(id);
        setEditPro(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductEdit();
  }, [id]);

  // Change title và price
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStateValue({
      ...stateValue,
      [name]: value,
    });
  };

  // onChange data update

  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // button display
  const handleChangeDiplay = (e) => {
    setDisplay(e.target.checked);
    let check = e.target.checked;
    const btnCheck = document.getElementById("btn-display");
    if (check) {
      btnCheck.style.backgroundColor = "#0f8f31";
    } else {
      btnCheck.style.backgroundColor = "#fff";
    }
  };
  // End button display

  // button position
  const handleChangePosition = (e) => {
    setPosition(e.target.checked);
    let check = e.target.checked;
    const btnCheck = document.getElementById("btn-position");
    if (check) {
      btnCheck.style.backgroundColor = "#0f8f31";
    } else {
      btnCheck.style.backgroundColor = "#fff";
    }
  };
  // End button position

  // End Onchange data update

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    const idElement = document.querySelector(".id").innerHTML;
    const dataUpdate = new FormData();

    // update
    dataUpdate.append("title", stateValue.title ?? editPro.title);
    dataUpdate.append("description", des ?? editPro.description);
    dataUpdate.append("detail", detail ?? editPro.detail);
    dataUpdate.append("content", content ?? editPro.content);
    dataUpdate.append("price", stateValue.price ?? editPro.price);
    dataUpdate.append("photo", file ?? editPro.photo);
    if (display ?? editPro.display) {
      dataUpdate.append("display", 1);
    } else {
      dataUpdate.append("display", 0);
    }
    if (position ?? editPro.position) {
      dataUpdate.append("position", 1);
    } else {
      dataUpdate.append("position", 0);
    }
    updateProduct(idElement, dataUpdate);
  };

  const updateProduct = async (id, data) => {
    try {
      setSuccess(false);
      setLoading(true);
      const res = await clientApi.productEdit(id, data);
      if (res) {
        notify();
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/product", data);
        }, 2000);
      }
    } catch (error) {
      notify("error", "Cập nhật sản phẩm thất bại!");
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <BackButton />

      <div className="flex flex-row gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl ">
        <form className="w-full" action="" onSubmit={(e) => handleSubmit(e)}>
          {editPro ? (
            <table
              key={editPro.id}
              className="w-full text-secondary flex flex-col justify-between gap-5"
            >
              {/* === Input === */}
              <div className="flex flex-row justify-between gap-5">
                {/* === Left Table === */}
                <div className="w-[65%] flex flex-col justify-between gap-4">
                  {/* === Id === */}

                  <div className="hidden">
                    <label className="id">{editPro.id}</label>
                  </div>
                  {/* === End Id === */}

                  {/* === Title === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="title">Title</label>
                    <input
                      name="title"
                      type="text"
                      value={stateValue.title ?? editPro.title}
                      className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChanges(e)}
                    />
                  </div>

                  {/* === End Title === */}

                  {/* === Price === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="text"
                      value={stateValue.price ?? editPro.price}
                      className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChanges(e)}
                    />
                  </div>

                  {/* === End Price === */}

                  {/* === Description === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="description">Description</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={editPro.description}
                      onEditorChange={(newText) => setDes(newText)}
                      init={{
                        height: 250,
                        width: "100%",
                        menubar: true,
                      }}
                      plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                      toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                      content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    />
                  </div>

                  {/* === End Discription === */}

                  {/* === Detail === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="detail">Detail</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={editPro.detail}
                      onEditorChange={(newText) => setDetail(newText)}
                      init={{
                        height: 250,
                        width: "100%",
                        menubar: true,
                      }}
                      plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                      toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                      content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    />
                  </div>

                  {/* === End Detail === */}

                  {/* === Content === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="content">Content</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={editPro.content}
                      onEditorChange={(newText) => setContent(newText)}
                      init={{
                        height: 500,
                        width: "100%",
                        menubar: true,
                      }}
                      plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                      toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                      content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    />
                  </div>

                  {/* === End Content === */}
                </div>

                {/* === End Left Table === */}

                {/* === Right Table === */}

                <div className="w-[35%] flex flex-col justify-start gap-5">
                  {/* === Image === */}
                  <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                    <div
                      className="group flex flex-col w-full justify-between items-center relative
                   gap-2"
                    >
                      <img
                        src={img ?? urlImg + editPro.photo}
                        alt=""
                        className=" w-full h-[250px] bg-cover shadow-lg rounded-md"
                      />
                      {/* <label
                        htmlFor="photo"
                        className="absolute hidden group-hover:flex justify-center items-center w-full h-[250px] bg-[#33333366] cursor-pointer "
                      > */}
                      <ButtonUpload htmlFor="photo" />
                      {/* </label> */}
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleChangeImage(e)}
                      />
                    </div>
                  </div>
                  {/* === End Image === */}

                  <div className="flex flex-row justify-between">
                    {/* === Display === */}

                    <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                      <label htmlFor="display">Display</label>
                      <div className="w-[55%] ">
                        <ButtonCheck
                          htmlFor="display"
                          idIcon="btn-display"
                          style={
                            editPro.display !== 1
                              ? {
                                  backgroundColor: "#fff",
                                }
                              : {
                                  backgroundColor: "#0f8f31",
                                }
                          }
                        />
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={editPro.display == 1 ? true : false}
                        id="display"
                        className="hidden"
                        onChange={(e) => handleChangeDiplay(e)}
                      />
                    </div>

                    {/* === End Display === */}

                    {/* === Position === */}

                    <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                      <label htmlFor="position">Position</label>
                      <div className="w-[55%] ">
                        <ButtonCheck
                          htmlFor="position"
                          idIcon="btn-position"
                          style={
                            editPro.position !== 1
                              ? {
                                  backgroundColor: "#fff",
                                }
                              : {
                                  backgroundColor: "#0f8f31",
                                }
                          }
                        />
                      </div>
                      <input
                        type="checkbox"
                        id="position"
                        className="hidden"
                        defaultChecked={editPro.position == 1 ? true : false}
                        onChange={(e) => handleChangePosition(e)}
                      />
                    </div>

                    {/* === End Position === */}
                  </div>
                </div>

                {/* === End Right Table === */}
              </div>

              {/* === End Input === */}

              {/* === Button Save === */}
              <div>
                {/* === Button Submit === */}

                <div className="flex justify-center items-center">
                  <button type="submit" className="relative">
                    <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading}
                    >
                      <FiSave className="mr-1" /> Lưu Thay Đổi
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </button>
                </div>

                {/* === End Button === */}
              </div>

              {/* === End Button Save === */}
            </table>
          ) : (
            <SkeletonEditProduct />
          )}
          {/* End pick from product */}
        </form>
      </div>
    </>
  );
};

export default ClientEditProduct;
