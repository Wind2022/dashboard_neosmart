import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { IoMdAddCircle } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

import { clientApi } from "../../../../api/api";
import ButtonUpload from "../../../../Component/Button/ButtonUpload";

import notimg from "../../../../assets/images/No-image-found.jpg";
import "../../ClientProducts/ClientAddProduct/ClientAddProduct.css";

const ClientAddListBlog = () => {
  const [image, setImage] = useState();

  const [img, setImg] = useState();
  const [des, setDes] = useState();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const notify = (type = "success", content = "Thêm list thành công!") =>
    toast[type](content);

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

  // ---------------------------------------

  // Prevent event submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // End Prevent event submit
  // ---------------------------------------

  // Handle image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // End handle Image
  // ---------------------------------------

  // Formik handle
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      photo: "",
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", des);
      data.append("photo", image);
      addBlog(data);
    },
  });
  const addBlog = async (data) => {
    try {
      setSuccess(false);
      setLoading(true);
      const res = await clientApi.listBlogAdd(data);
      if (res) {
        setSuccess(true);
        setLoading(false);
        notify();
        setTimeout(() => {
          navigate("/listblog");
        }, 1000);
      }
    } catch (error) {
      notify("error", "Thêm thất bại!");
      setSuccess(true);
      setLoading(false);
    }
  };

  // End formik handle
  // ---------------------------------------
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <ToastContainer />
      <div className="ml-3 hover:text-hoverButton">
        <div
          className="cursor-pointer flex flex-row gap-1 items-center"
          onClick={() => handleNavigate()}
        >
          <span>Back</span>
          <TiArrowBack />
        </div>
      </div>
      <div
        onSubmit={formik.handleSubmit}
        className=" gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl"
      >
        <form
          id="form"
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="text-[#fff] flex flex-col justify-between gap-5"
        >
          {/* === Input === */}
          <div className="flex flex-row justify-between gap-5">
            {/*=== Left ===*/}
            <div className="w-[65%] flex flex-col justify-start items-start gap-2">
              <div className="w-full flex flex-col justify-between gap-2 items-start">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Name"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="w-full border-[1px] dark:bg-primary dark:text-[#fff] border-secondary focus:border-[#e0ed2e]"
                />
              </div>
              {/* End title */}

              {/* ------------------------------------ */}

              {/* === Description === */}

              <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                <label htmlFor="description">Description</label>

                <Editor
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
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
            {/*=== End Left ===*/}

            {/*=== Right ===*/}

            <div className="w-[35%] flex flex-col justify-start items-start gap-2">
              {/* Photo */}
              <div className="w-full flex flex-row justify-between items-center mb-5">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  files={image}
                  onChange={(e) => handleImage(e)}
                  className="hidden"
                />
                <div className="relative group w-full flex flex-col justify-center items-center">
                  <img
                    src={img ?? notimg}
                    alt=""
                    className="w-full h-[250px] object-cover border-2 border-secondary"
                  />
                  <ButtonUpload htmlFor="photo" />
                </div>
              </div>

              {/* End Photo */}
            </div>
            {/*=== End Right ===*/}
          </div>
          {/* === End Input === */}
          {/* Button Add */}

          <div>
            {/* Button Add */}
            <div className="flex flex-row justify-center items-center">
              <button type="submit" className="relative">
                <Button variant="contained" sx={buttonSx} disabled={loading}>
                  <IoMdAddCircle />
                  Thêm List Blog
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

            {/* End Button Add */}
          </div>

          {/* End Button Add */}

          {/* ------------------------------------ */}
        </form>
        <p id="err" className="text-[red] text-[2rem] font-light"></p>
      </div>
    </>
  );
};

export default ClientAddListBlog;
