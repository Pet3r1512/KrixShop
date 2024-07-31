import { Skeleton } from "@/components/UI/ui/skeleton";

export default function ItemSkeleton() {
  return (
    <section className="lg:my-16 my-8 md:flex md:flex-row lg:gap-x-24 px-4 lg:px-0">
      <Skeleton className="h-[250px] w-auto md:w-2/5 md:h-auto lg:w-2/5 lg:h-[600px] mx-auto lg:mx-0 "></Skeleton>
      <div className="flex-1 flex flex-col gap-y-6 lg:gap-y-14">
        <Skeleton className="flex justify-between items-center relative">
          <Skeleton className="lg:text-5xl text-2xl font-bold text-primary w-1/2 lg:w-3/5 h-10 lg:h-14"></Skeleton>
        </Skeleton>
        <Skeleton className="w-1/2 h-8 lg:h-10"></Skeleton>
        <Skeleton className="lg:h-24"></Skeleton>
      </div>
    </section>
  );
}
