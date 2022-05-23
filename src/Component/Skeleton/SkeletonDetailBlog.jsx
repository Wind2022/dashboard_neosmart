import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SkeletonDetailBlog = (props) => {
  const { style } = props;
  return (
    <Box sx={style}>
      <div className="flex flex-col px-10 py-16 gap-5 h-[600px] overflow-y-scroll">
        <div className="flex flex-col gap-5 ">
          <div className="w-full flex justify-center items-center">
            <Skeleton variant="rectangular" width={"80%"} height={250} />
          </div>
          <div className="w-full flex flex-row gap-3 justify-between items-center">
            <div className="flex flex-col gap-1">
              <Skeleton variant="text" width={200} />
            </div>
            <div className="flex flex-col items-end">
              <p>
                <Skeleton variant="text" width={100} />
              </p>
              <p className="text-[#666] text-md font-light">
                <Skeleton variant="text" width={100} />
              </p>
            </div>
          </div>
        </div>
        <div>
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" width={100} />
        </div>
        <Skeleton variant="text" width={"100%"} />

        <Skeleton variant="rectangular" width={"80%"} height={350} />
      </div>
    </Box>
  );
};

export default SkeletonDetailBlog;
