import { Skeleton } from '@mui/material';

const TableSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        width={1700}
        height={70}
        animation="wave"
        sx={{ marginBottom: 2 }}
      />
      <Skeleton
        variant="rounded"
        width={1700}
        height={70}
        animation="wave"
        sx={{ marginBottom: 2 }}
      />
      <Skeleton
        variant="rounded"
        width={1700}
        height={70}
        animation="wave"
        sx={{ marginBottom: 2 }}
      />
      <Skeleton
        variant="rounded"
        width={1700}
        height={70}
        animation="wave"
        sx={{ marginBottom: 2 }}
      />
    </>
  );
};

export default TableSkeleton;
