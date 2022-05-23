import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useFormik, Field } from "formik";
import { useSelector } from "react-redux";
import { TiArrowBack } from "react-icons/ti";
import { Editor } from "@tinymce/tinymce-react";
import { location } from "../../../../Component/Variable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonCheck from "../../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../../Component/Button/ButtonUpload";
import notimg from "../../../../assets/images/No-image-found.jpg";
import { clientApi } from "../../../../api/api";
import { Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import BackButton from "../../../../Component/Button/BackButton";

// config upload img
const init = {
  file_browser_callback: function (field_name, url, type, win) {
    win.document.getElementById(field_name).value = "my browser value";
  },
  file_browser_callback_types: "image media",
  file_picker_callback: function (callback, value, meta) {
    // Provide file and text for the link dialog

    // Provide image and alt text for the image dialog
    if (meta.filetype == "image") {
      callback("myimage.jpg", { alt: "My alt text" });
    }

    // Provide alternative source and posted for the media dialog
    if (meta.filetype == "media") {
      callback("movie.mp4", {
        source2: "alt.ogg",
        poster: "image.jpg",
      });
    }
  },
  file_picker_types: "file image media",
  images_upload_url: location,
  automatic_uploads: false,
  images_reuse_filename: true,
  images_dataimg_filter: function (img) {
    return img.hasAttribute("internal-blob");
  },
  tablemergecells: true,
};

// End config upload img

const ClientAddBlog = () => {
  const [image, setImage] = useState();

  const [display, setDisplay] = useState(true);
  const [content, setContent] = useState();
  const [des, setDes] = useState();
  const [detail, setDetail] = useState();
  const [position, setPosition] = useState(true);
  const [listBlog, setListBlog] = useState([]);
  const [img, setImg] = useState();
  const [listBLogId, setListBlogId] = useState();
  const navigate = useNavigate();
  const dataListBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  const notify = (type = "error", content = "Vui lòng nhập đầy đủ!") =>
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

  const editorRef = useRef(null);

  useEffect(() => {
    const getListBlog = async () => {
      try {
        const res = await clientApi.listBlogShow();
        setListBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListBlog();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // handle change display

  const handleChangeDisplay = (e) => {
    setDisplay(e.target.checked);
  };

  // End handle change display

  // ---------------------------------------

  // handle change position

  const handleChangePosition = (e) => {
    setPosition(e.target.checked);
  };

  // End handle change position

  // handle change Category

  const handleChangeListBlog = (e) => {
    setListBlogId(e.target.value);
  };

  // End handle change Category

  //   Add Blog
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", des);
      data.append("content", content);
      data.append("detail", detail);
      data.append("photo", image);
      data.append("display", display ? 1 : 0);
      data.append("position", position ? 1 : 0);
      data.append("listblog_id", listBLogId ?? dataListBlog[0].id);
      addBlog(data);
    },
  });

  //   FunctionAdd
  const addBlog = async (data) => {
    try {
      setSuccess(false);
      setLoading(true);
      const res = await clientApi.blogAdd(data);
      if (res) {
        setSuccess(true);
        setLoading(false);
        notify("success", "Thêm sản phẩm thành công!");
        // navigate("/product/add");
      }
    } catch (error) {
      notify();
      setSuccess(true);
      setLoading(false);
    }
  };

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

  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <>
      <ToastContainer />
      <BackButton />
      <div
        onSubmit={formik.handleSubmit}
        className=" gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl"
      >
        <form
          id="form"
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="text-[#fff] flex flex-col justify-between gap-2"
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

              {/* Description */}
              <div className="w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="description">Description</label>

                <Editor
                  name="description"
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<b>Địa chỉ: <br>Diện tích: "
                  onEditorChange={(newText) => setDes(newText)}
                  init={{
                    height: 250,
                    width: "100%",
                    menubar: true,
                    image_advtab: true,
                    ...init,
                  }}
                  plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                  toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                  content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                />
              </div>
              {/* End Description */}

              {/* Description */}
              <div className="w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="description">Detail</label>

                <Editor
                  name="detail"
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<b>Giới thiệu chung:</b>"
                  onEditorChange={(newText) => setDetail(newText)}
                  init={{
                    height: 250,
                    width: "100%",
                    menubar: true,
                    ...init,
                  }}
                  plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                  toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                  content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                />
              </div>
              {/* End Description */}

              {/* ------------------------------------ */}

              {/* Content */}
              <div className=" w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="content">Content</label>

                <Editor
                  name="content"
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  onEditorChange={(newText) => setContent(newText)}
                  init={{
                    height: 500,
                    width: "100%",
                    menubar: true,
                    ...init,
                  }}
                  plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image imagetools"
                  toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image  imagetools"
                  content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  imagetools_cors_hosts={("mydomain.com", "otherdomain.com")}
                />
              </div>
              {/* End Content */}
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
                    className="w-full h-[250px] object-cover shadow-lg rounded-md"
                  />
                  <ButtonUpload htmlFor="photo" />
                </div>
              </div>

              {/* End Photo */}

              {/* ------------------------------------ */}

              <div className="w-full flex flex-row justify-between">
                {/* Display */}
                <div className="w-1/2 flex flex-row justify-between items-center mb-5">
                  <label htmlFor="display">Display</label>
                  <input
                    type="checkbox"
                    name="display"
                    id="display"
                    defaultChecked={true}
                    onChange={(e) => handleChangeDisplay(e)}
                    className="hidden"
                  />
                  <div className="w-[55%]">
                    <ButtonCheck
                      htmlFor="display"
                      idIcon="btn-display"
                      style={
                        display
                          ? { backgroundColor: "#0f8f31" }
                          : { backgroundColor: "#fff" }
                      }
                    />
                  </div>
                </div>

                {/* End Display */}

                {/* ------------------------------------ */}

                {/* Position */}
                <div className="w-1/2 flex flex-row justify-between items-center mb-5">
                  <label htmlFor="position">Position</label>
                  <input
                    type="checkbox"
                    name="position"
                    id="position"
                    defaultChecked={true}
                    onChange={(e) => handleChangePosition(e)}
                    className="hidden"
                  />
                  <div className="w-[55%]">
                    <ButtonCheck
                      htmlFor="position"
                      idIcon="btn-position"
                      style={
                        position
                          ? { backgroundColor: "#0f8f31" }
                          : { backgroundColor: "#fff" }
                      }
                    />
                  </div>
                </div>

                {/* End Position */}
              </div>

              {/* ------------------------------------ */}

              {/* Category id */}
              <div className="w-full flex flex-row justify-between gap-2 items-center ">
                <label htmlFor="listblog_id">Blog List</label>
                <div className="w-[75%] flex justify-start items-center">
                  <select
                    onChange={(e) => handleChangeListBlog(e)}
                    name="listblog_id"
                    id="listblog_id"
                    className="text-[#333] dark:bg-primary dark:text-[#fff] border-[1px] border-[#888] rounded-md outline-none px-2 py-1"
                  >
                    {listBlog?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* End category id */}

              {/* ------------------------------------ */}
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
                  <IoMdAddCircle className="mr-1" />
                  Thêm Bài Viết
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

export default ClientAddBlog;
