import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

const ButtonAdd = (props) => {
  const { link, title } = props;
  return (
    <Link
      to={link}
      className="px-2 py-2 text-sm rounded-lg cursor-pointer shadow-lg text-[#fff] hover:bg-hoverButton bg-bgButton flex flex-row items-center"
    >
      <IoIosAddCircleOutline className="mr-3" />
      {title}
    </Link>
  );
};

export default ButtonAdd;
