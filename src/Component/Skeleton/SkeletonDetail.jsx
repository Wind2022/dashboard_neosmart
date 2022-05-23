import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonDetail = (props) => {
  const { style } = props;
  return (
    <>
      <Box sx={style}>
        <div className="flex flex-col px-10 py-16 h-[600px] overflow-y-scroll gap-5">
          <div className="flex flex-row gap-5 ">
            <div className="w-[40%]">
              <Skeleton variant="rectangular" width={"100%"} height={200} />
            </div>
            <div className="w-[60%] flex flex-col gap-3">
              <div>
                <Skeleton variant="text" width={"100%"} />
                <Skeleton variant="text" width={"40%"} />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default SkeletonDetail;
