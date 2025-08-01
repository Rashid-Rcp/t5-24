export default function DiscussionCardSkeleton() {
  return (
    <div className="bg-t5-white-lite rounded-xl p-4 my-2 disccussion-card border">
      <div className="flex flex-row justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
      
      <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded my-2"></div>
      
      {/* Player skeleton */}
      <div className="my-0 h-16 bg-gray-200 animate-pulse rounded"></div>
      
      {/* Participants section */}
      <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mt-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-1 mt-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
