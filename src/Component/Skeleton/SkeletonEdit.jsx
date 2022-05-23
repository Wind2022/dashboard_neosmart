import Skeleton from "@mui/material/Skeleton";

const SkeletonEdit = () => {
  return (
    <>
      <table className="w-full text-secondary flex flex-col justify-between gap-5">
        {/* === Input === */}
        <div className="flex flex-row justify-between gap-5">
          {/* === Left Table === */}
          <div className="w-[65%] flex flex-col justify-between gap-4">
            {/* === Id === */}

            <div className="hidden">
              <label className="id"></label>
            </div>
            {/* === End Id === */}

            {/* === Title === */}

            <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
              <Skeleton variant="text" width={"20%"} />
              <Skeleton variant="rectangular" width={"100%"} height={40} />
            </div>

            {/* === End Title === */}

            {/* === Description === */}

            <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
              <Skeleton variant="text" width={"20%"} />

              <Skeleton variant="rectangular" width={"100%"} height={250} />
            </div>

            {/* === End Discription === */}
          </div>

          {/* === End Left Table === */}

          {/* === Right Table === */}

          <div className="w-[35%] flex flex-col justify-start gap-5">
            {/* === Image === */}
            <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
              <div
                className="group flex flex-col w-full justify-between items-center relative
             gap-2"
              >
                <Skeleton variant="rectangular" width={"100%"} height={250} />
              </div>
            </div>
            {/* === End Image === */}
          </div>

          {/* === End Right Table === */}
        </div>

        {/* === End Input === */}

        {/* === Button Save === */}
        <div>
          {/* === Button Submit === */}

          <div className="flex justify-center items-center">
            <Skeleton variant="rectangular" width={"10%"} height={30} />
          </div>

          {/* === End Button === */}
        </div>

        {/* === End Button Save === */}
      </table>
    </>
  );
};

export default SkeletonEdit;
