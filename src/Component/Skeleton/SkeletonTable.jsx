import Skeleton from "@mui/material/Skeleton";

const SkeletonTable = (props) => {
  const { rows, columns, image = null } = props;
  const row = new Array(rows).fill(0);
  const cols = new Array(columns).fill(0);
  return (
    <>
      {row.map((item, index) => (
        <tr key={index}>
          {image ? (
            <td className="flex flex-row justify-start gap-2 items-center">
              <Skeleton variant="rectangular" width={50} height={35} />
              <Skeleton variant="text" width={200} />
            </td>
          ) : (
            <td>
              <Skeleton variant="text" width={100} />{" "}
              <Skeleton variant="text" width={150} />
            </td>
          )}

          {cols.map((col, index) => (
            <td key={index}>
              <Skeleton variant="text" />
            </td>
          ))}

          <td>
            <Skeleton variant="circular" width={40} height={40} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default SkeletonTable;
