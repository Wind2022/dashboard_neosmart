import { BsCheckLg } from "react-icons/bs";

const ButtonCheck = (props) => {
  const { htmlFor, idIcon, style } = props;
  return (
    <>
      <label
        htmlFor={htmlFor}
        style={style}
        className="inline-block p-[0.05rem] bg-lightSecondary rounded-sm border-2 border-primary cursor-pointer"
      >
        <BsCheckLg id={idIcon} className="text-[0.9rem] text-[#fff]" />
      </label>
    </>
  );
};

export default ButtonCheck;
