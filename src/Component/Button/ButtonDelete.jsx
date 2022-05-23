import { AiFillDelete } from "react-icons/ai";

const ButtonDelete = (props) => {
  const { handleClick } = props;
  return (
    <>
      <span
        onClick={handleClick}
        className="inline-block border-2 border-[#333] mx-auto p-[0.4rem] rounded-[50%] cursor-pointer dark:text-[#333] dark:hover:text-[#fff] bg-[#fff] mr-3 hover:bg-[#e64141] hover:text-[#fff]"
      >
        <AiFillDelete />
      </span>
    </>
  );
};

export default ButtonDelete;
