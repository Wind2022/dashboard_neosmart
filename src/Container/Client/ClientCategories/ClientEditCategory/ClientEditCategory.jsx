import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import { IoMdAddCircle } from "react-icons/io";

import ButtonUpload from "../../../../Component/Button/ButtonUpload";
import { clientApi } from "../../../../api/api";
import { urlImg } from "../../../../Component/Variable";
import "../../ClientProducts/ClientEditProduct/ClientEditProduct.css";
import SkeletonEdit from "../../../../Component/Skeleton/SkeletonEdit";
import BackButton from "../../../../Component/Button/BackButton";

const ClientEditCategory = () => {
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
  });
  const [des, setDes] = useState();

  const editorRef = useRef(null);

  const [editCategory, setEditCategory] = useState(null);
  const dispath = useDispatch();

  const [getTheme, setGetTheme] = useState();
  const navigate = useNavigate();
  const notify = (type = "success", content = "Sửa danh mục thành công!") =>
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
    const getEditCategory = async () => {
      try {
        const res = await clientApi.categoryShowById(id);
        setEditCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEditCategory();
  }, []);

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

  // End Onchange data update

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    const idElement = document.querySelector(".id").innerHTML;
    const dataUpdate = new FormData();

    // update
    dataUpdate.append("title", stateValue.title ?? editCategory.title);
    dataUpdate.append("description", des ?? editCategory.description);
    dataUpdate.append("photo", file ?? editCategory.photo);

    updateProduct(idElement, dataUpdate);
    setEditCategory([]);
    setLoad(!load);
  };

  const updateProduct = async (idElement, data) => {
    try {
      const res = await clientApi.categoryEdit(idElement, data);
      if (res) {
        setSuccess(true);
        setLoading(false);
        notify();
        setTimeout(() => {
          navigate("/category");
        }, 2000);
      }
    } catch (error) {
      setSuccess(false);
      setLoading(true);
      notify("error", "Cập nhật danh mục thất bại!");
    }
  };

  const handleNavigate = () => {
    navigate(-2);
  };

  return (
    <>
      <ToastContainer />

      <BackButton />

      <div className="flex flex-row gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl ">
        <form className="w-full" action="" onSubmit={(e) => handleSubmit(e)}>
          {editCategory ? (
            <table className="w-full text-secondary flex flex-col justify-between gap-5">
              {/* === Input === */}
              <div className="flex flex-row justify-between gap-5">
                {/* === Left Table === */}
                <div className="w-[65%] flex flex-col justify-between gap-4">
                  {/* === Id === */}

                  <div className="hidden">
                    <label className="id">{editCategory.id}</label>
                  </div>
                  {/* === End Id === */}

                  {/* === Title === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="title">Title</label>
                    <input
                      name="title"
                      type="text"
                      value={stateValue.title ?? editCategory.title}
                      className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChanges(e)}
                    />
                  </div>

                  {/* === End Title === */}

                  {/* === Description === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="description">Description</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={editCategory.description}
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
                        src={img ?? urlImg + editCategory.photo}
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
                      <IoMdAddCircle /> Lưu
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
            <SkeletonEdit />
          )}
          {/* End pick from product */}
        </form>
      </div>
    </>
  );
};

export default ClientEditCategory;
