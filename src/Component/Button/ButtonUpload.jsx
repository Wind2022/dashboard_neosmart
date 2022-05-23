import { AiOutlineCloudUpload } from "react-icons/ai";

import "./Button.css";

const ButtonUpload = (props) => {
  const { htmlFor } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="absolute bg-[#0000006c] fade-cross hidden w-2 group-hover:flex justify-center opacity-0 items-center h-[250px] cursor-pointer rounded-md"
    >
      <AiOutlineCloudUpload className="text-[2.8rem] cursor-pointer text-lightSecondary hover:text-lightPrimary" />
    </label>
  );
};

export default ButtonUpload;
