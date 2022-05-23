import { FiSave } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TiArrowBack } from "react-icons/ti";

import { urlImg } from "../../../../Component/Variable";
import "../../ClientProducts/ClientEditProduct/ClientEditProduct.css";
import ButtonCheck from "../../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../../Component/Button/ButtonUpload";
import { clientApi } from "../../../../api/api";
import SkeletonEditProduct from "../../../../Component/Skeleton/SkeletonEditProduct";
import { IoSave } from "react-icons/io5";
import { Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import BackButton from "../../../../Component/Button/BackButton";

const ClientEditNews = () => {
  const { id } = useParams();
  // getApi
  // const [data, setData] = useState([]);

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
  const [img, setImg] = useState();
  // get data edited
  const [title, setTitle] = useState();
  const [des, setDes] = useState();
  const [content, setContent] = useState();
  const [display, setDisplay] = useState();
  const [position, setPosition] = useState();
  const [detail, setDetail] = useState();
  const [blogEdit, setBlogEdit] = useState(null);
  const dispath = useDispatch();
  // const getEdit = useSelector((state) => state.blogs.blogs.blog);
  const [getTheme, setGetTheme] = useState();
  const navigate = useNavigate();

  const editorRef = useRef(null);

  const notify = (type = "error", content = "Lỗi hệ thống không thể upload!") =>
    toast[type](content);

  const getChangeTheme = async () => {
    try {
      await window.addEventListener("click", (e) => {
        setGetTheme(localStorage.getItem("theme"));
      });
    } catch (error) {
      console.log(error);
    }
  };
  getChangeTheme();

  useEffect(() => {
    const getDataBlogEdit = async () => {
      try {
        const res = await clientApi.blogShowById(id);
        setBlogEdit(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataBlogEdit();
  }, [id]);

  // --------------------------------

  // onChange data update
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

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
    const id = document.querySelector(".id").innerHTML;
    const dataUpdate = new FormData();

    // update
    dataUpdate.append("title", title ?? blogEdit.title);
    dataUpdate.append("detail", detail ?? blogEdit.detail);
    dataUpdate.append("description", des ?? blogEdit.description);
    dataUpdate.append("photo", file ?? blogEdit.photo);
    dataUpdate.append("content", content ?? blogEdit.content);
    if (display ?? blogEdit.display) {
      dataUpdate.append("display", 1);
    } else {
      dataUpdate.append("display", 0);
    }
    if (position ?? blogEdit.position) {
      dataUpdate.append("position", 1);
    } else {
      dataUpdate.append("position", 0);
    }
    updateBlog(id, dataUpdate);
    setLoad(!load);
  };

  const updateBlog = async (id, data) => {
    try {
      setSuccess(false);
      setLoading(true);
      const res = await clientApi.blogEdit(id, data);
      if (res) {
        notify("success", "Cập nhật bài viết thành công!");
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/blog", data);
        }, 2000);
      }
    } catch (error) {
      notify();
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
          {
            // pick from product
            blogEdit ? (
              <table
                key={blogEdit.id}
                className="w-full text-secondary flex flex-col justify-between gap-5"
              >
                {/* === Input === */}
                <div className="flex flex-row justify-between gap-5">
                  {/* === Left Table === */}
                  <div className="w-[65%] flex flex-col justify-between gap-4">
                    {/* === Id === */}

                    <div className="hidden">
                      <label className="id">{blogEdit.id}</label>
                    </div>
                    {/* === End Id === */}

                    {/* === Title === */}

                    <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        value={title ?? blogEdit.title}
                        className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                        onChange={(e) => handleChangeTitle(e)}
                      />
                    </div>

                    {/* === End Title === */}

                    {/* === Description === */}

                    <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                      <label htmlFor="description">Description</label>

                      <Editor
                        apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={blogEdit.description}
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
                        initialValue={blogEdit.detail}
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
                        initialValue={blogEdit.content}
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

                  <div className=" w-[35%] flex flex-col justify-start gap-5">
                    {/* === Image === */}
                    <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                      <div
                        className="relative group flex flex-col w-full justify-between items-center
                   gap-2"
                      >
                        <img
                          src={img ?? urlImg + blogEdit.photo}
                          alt=""
                          className="w-full h-[250px] bg-cover shadow-lg rounded-md"
                        />
                        <input
                          type="file"
                          name="photo"
                          id="photo"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleChangeImage(e)}
                        />
                        <ButtonUpload htmlFor="photo" />
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      {/* === Display === */}

                      <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                        <label htmlFor="display">Display</label>
                        <div className="w-[55%] ">
                          <ButtonCheck
                            htmlFor="display"
                            idIcon="btn-display"
                            style={
                              blogEdit.display !== 1
                                ? { backgroundColor: "#fff" }
                                : { backgroundColor: "#0f8f31" }
                            }
                          />
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked={blogEdit.display == 1 ? true : false}
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
                              blogEdit.position !== 1
                                ? { backgroundColor: "#fff" }
                                : { backgroundColor: "#0f8f31" }
                            }
                          />
                        </div>
                        <input
                          type="checkbox"
                          id="position"
                          className="hidden"
                          defaultChecked={blogEdit.position == 1 ? true : false}
                          onChange={(e) => handleChangePosition(e)}
                        />
                      </div>

                      {/* === End Position === */}
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
              <SkeletonEditProduct price={false} />
            )
          }
          {/* End pick from product */}
        </form>
      </div>
    </>
  );
};

export default ClientEditNews;
