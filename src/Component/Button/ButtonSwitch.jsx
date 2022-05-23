const ButtonSwitch = (props) => {
  const { id, name, handleChange, handleClick } = props;
  return (
    <>
      <label
        htmlFor={id}
        style={
          name == 1
            ? { backgroundColor: "#0f8f31" }
            : { backgroundColor: "#e64141" }
        }
        className="flex items-center w-[2.4rem] h-[1.4rem] rounded-2xl border-2 border-[#fff] cursor-pointer"
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          className="hidden"
          defaultChecked={name == 1 ? true : false}
          onChange={handleChange}
          onClick={handleClick}
        />
        <span
          id={id}
          style={
            name == 1
              ? { transform: "translateX(125%)" }
              : { transform: "translateX(20%)" }
          }
          className="btn-display block h-[0.9rem] w-[0.9rem] translate-x-[20%] rounded-[50%] bg-[#fff] shadow-md transition-transform"
        ></span>
      </label>
    </>
  );
};

export default ButtonSwitch;
