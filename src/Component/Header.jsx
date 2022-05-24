import { IoMdArrowDropdown } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import { FiAlignJustify } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useDark from "../useDark";
import { clientApi } from "../api/api";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { socket } from "./Variable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BiLogOut } from "react-icons/bi";
import "./Button/Button.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffee58",
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "red",
    color: "#fff",
  },
}));

const Header = ({ handleShowRespon }) => {
  const [noti, setNoti] = useState();
  const [notification, setNotification] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [isDarkMode, toggleDarkMode] = useDark();
  const user = useSelector((state) => state.auth.login.currentUser);
  // const dispath = useDispatch();
  const navigate = useNavigate();
  // const accessToken = user?.access_token;
  const [inputValue, setInputValue] = useState();
  const [show, setShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setTimeout(() => {
        setNoti(!noti);
      }, 600);
    });
  });
  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await clientApi.messageShow();
        setNotification(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotification();
  }, [noti]);

  useEffect(() => {
    const newNoti = notification.filter((mess) => mess.status == 0);
    setNewMessage(newNoti);
  }, [notification]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleShowProfile = (e) => {
    setShow(!show);
  };
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.removeItem("currentUrl");
    navigate("/login");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <FiAlignJustify
          className="tb:block dt:hidden p-[2px] text-[38px] cursor-pointer translate-x-[-0.5rem] mr-[20px] dark:text-[#fff]"
          onClick={(e) => handleShowRespon(e)}
        />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Search"
          value={inputValue}
          className="px-5 py-1 dark:bg-primary shadow-lg bg-[#fcfbf3] border-[1px] dark:text-[#fff] text-[black] outline-none placeholder:text-sm w-[40%] rounded-lg "
        />
        {/* <div className="s">
          {isDarkMode ? (
            <div
              className="bg-gradient-to-b from-[#146910] to-[#bfda29] rounded-md  p-2 flex justify-between items-center cursor-pointer transition-all "
              onClick={toggleDarkMode}
            >
              <BsMoonStarsFill className="text-[black]" />
            </div>
          ) : (
            <div
              className="bg-gradient-to-t from-[#c2a016] to-[#b969de] shadow-md rounded-md p-2 flex justify-between items-center cursor-pointer transition-all "
              onClick={toggleDarkMode}
            >
              <BsSunFill className="text-[#f5eec8be]" />
            </div>
          )}
        </div> */}

        <div className="flex flex-row justify-center gap-5 items-center cursor-pointer">
          <IconButton onClick={() => navigate("/mail")} aria-label="cart">
            <StyledBadge badgeContent={newMessage.length}>
              <HiMail className="text-3xl text-[#000]" />
            </StyledBadge>
          </IconButton>
          <ThemeProvider theme={theme}>
            <Button variant="text" onClick={handleClick}>
              <img
                onClick={(e) => handleShowProfile(e)}
                src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
                alt=""
                className="w-[2.25rem] h-[2.25rem] rounded-[50%] mr-2"
              />

              <div
                onClick={(e) => handleShowProfile(e)}
                className="flex flex-row justify-center items-center text-[#fff] relative"
              >
                {user ? (
                  <>
                    <div className="text-sm dark:text-[white] text-[black] lowercase ">
                      {" "}
                      Hi,{user.user.name}
                    </div>
                    <IoMdArrowDropdown className="dark:text-[white] text-[black] text text-lg" />
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
            </Button>
          </ThemeProvider>
        </div>
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
          <MenuItem
            style={{
              width: "130px",
              padding: "8px 5px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onClick={handleLogOut}
          >
            <BiLogOut className="text-xl mr-2" /> Logout
          </MenuItem>
        </Menu>

        {/* <div
          style={show ? { display: "block" } : { display: "none" }}
          className="profile absolute top-[11%] w-[180px] rounded-[4px] right-[1rem] shadow-md shadow-primary dark:bg-[black] bg-[#f5eec8] dark:text-[#fff] text-[black] z-[1000]"
        >
          <div className="text-[16px] font-medium border-b-[1px] border-secondary px-5 py-3 cursor-pointer">
            Profile
          </div>
          <div
            onClick={handleLogOut}
            className="group pt-3 flex flex-row items-center hover:bg-lightSecondary dark:hover:bg-nightSecondary cursor-pointer px-5 py-3"
          >
            <span className="w-10 h-10 rounded-[50%] bg-[#ffffffc0] dark:bg-bgButton group-hover:bg-lightPrimary mr-3 flex justify-center items-center">
              <MdOutlineLogout className=" text-[red] text-[1.25rem]" />
            </span>
            <button> Log Out</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
