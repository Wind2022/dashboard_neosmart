import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SkeletonDetailProduct = (props) => {
  const { style } = props;
  return (
    <Box sx={style}>
      <div className="flex flex-col px-10 py-16 h-[600px] overflow-y-scroll gap-5">
        <div className="flex flex-row gap-5 ">
          <div className="w-[40%]">
            <Skeleton variant="rectangular" width={"100%"} height={200} />
          </div>
          <div className="w-[60%] flex flex-col gap-3">
            <div>
              <Skeleton variant="text" width={"100%"} />
              <Skeleton variant="text" width={"80%"} />
            </div>
            <div>
              <Skeleton variant="text" width={200} />
            </div>
            <Skeleton variant="text" width={"70%"} />
            <Skeleton variant="text" width={"70%"} />
            <Skeleton variant="text" width={"70%"} />
            <Skeleton variant="text" width={"70%"} />
          </div>
        </div>
        <div>
          <Skeleton variant="rectangular" width={"100%"} height={300} />
        </div>
      </div>
    </Box>
  );
};

export default SkeletonDetailProduct;
