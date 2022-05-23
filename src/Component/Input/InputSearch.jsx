const InputSearch = (props) => {
  const { handleChange, value } = props;
  return (
    <div className="w-[40%]">
      {/* input */}
      <input
        onChange={handleChange}
        type="text"
        value={value}
        className="w-full outline-none py-[0.4rem] text-sm rounded-md dark:bg-primary bg-[#fcfbf3] px-4 dark:text-[#fff] text-[#333] border-[1px] dark:border-[#fff] border-primary"
        placeholder="Search..."
      />
      {/* End input */}
    </div>
  );
};

export default InputSearch;
