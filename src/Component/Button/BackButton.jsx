import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start items-center hover:text-hoverButton">
      <span
        onClick={() => navigate(-1)}
        className=" px-5 py-1 cursor-pointer text-center"
      >
        Back
        <TiArrowBack className="float-right translate-y-1" />
      </span>
    </div>
  );
};

export default BackButton;
