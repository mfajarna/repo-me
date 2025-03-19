import { Skeleton } from '../ui/skeleton';

const SkeletonLoading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="">
          <Skeleton className="h-[200px] w-[200px] rounded-xl" key={item} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
