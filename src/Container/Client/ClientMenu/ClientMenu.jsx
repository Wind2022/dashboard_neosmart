import React, { useState, useEffect } from "react";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { useDispatch, useSelector } from "react-redux";
import { clientApi } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { getAllMenu } from "../../../app/apiRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientMenu = () => {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(true);
  const [menuId, setMenuId] = useState([]);
  const [displayName, setDisplayName] = useState();
  const [link, setLink] = useState();
  const [position, setPosition] = useState();
  const [parent, setParent] = useState();
  const [display, setDisplay] = useState();
  const handleChangeDisplay = (e) => {
    setDisplay(e.target.checked);
  };
  const notify = () => toast.success("Cập nhật menu thành công!");
  const navigate = useNavigate();
  const dispath = useDispatch();
  const dataMenu = useSelector((state) => state.menu.menu.listMenu);

  const getMenuById = async (id) => {
    try {
      const res = await clientApi.menuShowId(id);
      setMenuId([res.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const upDateMenu = async (id, data) => {
    try {
      await clientApi.menuEdit(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMenu(dispatch);
  }, [render]);

  const handleEdit = () => setShow(true);

  const editMenuById = (id) => {
    handleEdit(false);
    getMenuById(id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataUpdate = new FormData();

    dataUpdate.append("label", displayName ?? menuId[0].label);
    dataUpdate.append("link", link ?? menuId[0].link);
    dataUpdate.append("parent", parent ?? menuId[0].parent);
    dataUpdate.append("position", position ?? menuId[0].position);
    if (display ?? menuId.display) {
      dataUpdate.append("display", 1);
    } else {
      dataUpdate.append("display", 0);
    }
    upDateMenu(menuId[0].id, dataUpdate);
    notify();
    setRender(!render);
  };

  return (
    <div>
      <div>
        <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
          <ButtonAdd link="/menu/add" title="Add Menu" />
        </div>
        <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
          <table className="w-full text-bgButton font-semibold">
            <thead>
              <tr>
                <td>ID</td>
                <td>Displayname</td>
                <td>Link</td>
                <td>Sub Menu</td>
                <td>Position</td>
                <td>Display</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="text-[#333] dark:text-[#fff] font-light">
              {dataMenu?.map((item) => (
                <tr
                  key={item.id}
                  className="dark:hover:hoverButton"
                  onClick={(id) => editMenuById(item.id)}
                >
                  <td>{item.id}</td>
                  <td className="flex flex-row justify-start gap-2 w-40 items-center">
                    <p className="break-words hover:text-bgButton dark:hover:text-lightPrimary">
                      {item.label}
                    </p>
                  </td>
                  <td>{item.link}</td>
                  <td>{item.parent}</td>
                  <td>{item.sort}</td>
                  <td>{item.display == 0 ? <p>Ẩn</p> : <p>Hiện</p>}</td>
                  <td>
                    <button className="bg-[red] px-2 text-[white]">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {menuId.map((item) => (
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label htmlFor="">Title</label>
              <input
                type="text"
                value={displayName ?? item.label}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Link</label>
              <input
                type="text"
                value={link ?? item.link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Parent</label>
              <input
                type="text"
                value={parent ?? item.parent}
                onChange={(e) => setParent(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Position</label>
              <input
                type="text"
                value={position ?? item.position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Display</label>
              <input
                type="checkbox"
                defaultChecked={item.display == 1 ? true : false}
                onChange={(e) => handleChangeDisplay(e)}
              />
            </div>
            <div>
              <button type="submit" className="bg-[red] text-[white] px-4">
                sửa
              </button>
            </div>
          </form>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ClientMenu;
