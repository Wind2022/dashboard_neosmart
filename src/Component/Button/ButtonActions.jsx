import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import "./Button.css";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineBrandingWatermark } from "react-icons/md";

const ButtonActions = (props) => {
  const { HandleDelete, handleEdit, handleSeen } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    switch (e.target.innerText) {
      case "See more":
        handleSeen();
        break;
      case "Edit":
        handleEdit();
        break;
      case "Delete":
        HandleDelete();
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };
  const options = [
    {
      action: "See more",
      onC: handleClose,
    },
    {
      action: "Edit",
      onC: handleClose,
    },
    {
      action: "Delete",
      onC: handleClose,
    },
  ];
  const optionSee = [
    {
      action: "See more",
      onC: handleClose,
    },
  ];

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { backgroundColor: "#f5eec8" },
        }}
      >
        {!handleEdit
          ? optionSee.map((option, index) => (
              <MenuItem
              className="button-action"
                key={index}
                onClick={option.onC}
                style={{ height: "25px", fontSize: "13px", fontWeight: "600" }}
              >
                {option.action}
              </MenuItem>
            ))
          : options.map((option, index) => (
              <MenuItem
              className="button-action"
                key={index}
                onClick={option.onC}
                style={{ height: "25px", fontSize: "13px", fontWeight: "600" }}
              >
                {option.action}
              </MenuItem>
            ))}
      </Menu>
    </>
  );
};

export default ButtonActions;
